import { productAdminSchema, type ProductFormData } from "@/core/zod/admin/production-validation"
import { useCallback, useEffect, useState } from "react"
import { useCategory } from "../useCategory"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import type { FieldArrayItem } from "@/modules/admin/products/components/summary-section"

interface UseProductFormOptions {
    mode: 'create' | 'edit'
    initialData?: ProductFormData | null
    onSubmit: (data: ProductFormData) => Promise<void>
}
export const useProductForm = ({ mode, initialData, onSubmit }: UseProductFormOptions) => {
    const [isLoading, setIsLoading] = useState(false)
    const [newTag, setNewTag] = useState('')
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const { categories, getActiveCategories, loading: categoriesLoading } = useCategory()

    const getDefaultValues = (): ProductFormData => {
        if (mode === 'edit' && initialData) {
            return {
                name: initialData.name,
                description: initialData.description,
                price: initialData.price,
                originalPrice: initialData.originalPrice || null,
                discountPercentage: initialData.discountPercentage || 0,
                hasDiscount: initialData.hasDiscount || false,
                images: initialData.images || [],
                categoryId: initialData.categoryId,
                stock: initialData.stock,
                featured: initialData.featured || false,
                isActive: initialData.isActive !== undefined ? initialData.isActive : true,
                brand: initialData.brand || '',
                tags: initialData.tags || []
            }
        }

        return {
            name: '',
            description: '',
            price: 0,
            originalPrice: null,
            discountPercentage: 0,
            hasDiscount: false,
            images: [],
            categoryId: '',
            stock: 0,
            featured: false,
            isActive: true,
            brand: '',
            tags: []
        }
    }

    const form = useForm<ProductFormData>({
        resolver: zodResolver(productAdminSchema),
        defaultValues: getDefaultValues(),
        mode: 'onChange'
    })

    const {
        fields: imageFields,
        append: appendImage,
        remove: removeImage,
        replace: replaceImages
    } = useFieldArray({
        control: form.control ,
        name: 'images' as never
    })

    const { fields: tagFields, append: appendTag, remove: removeTag, replace: replaceTags } = useFieldArray({
        control: form.control,
        name: 'tags' as never
    })

    // Cargar categorías
    useEffect(() => {
        getActiveCategories()
    }, [getActiveCategories])

    // Detectar cambios no guardados (solo en modo edit)
    useEffect(() => {
        if (mode === 'edit') {
            const subscription = form.watch(() => setHasUnsavedChanges(true))
            return () => subscription.unsubscribe()
        }
    }, [form, mode])

    // Observar cambios en descuentos
    const hasDiscount = form.watch('hasDiscount')
    const price = form.watch('price')
    const originalPrice = form.watch('originalPrice')

    // Calcular porcentaje automáticamente
    useEffect(() => {
        if (hasDiscount && originalPrice && price && originalPrice > price) {
            const percentage = Math.round(((originalPrice - price) / originalPrice) * 100)
            form.setValue('discountPercentage', percentage)
        } else if (!hasDiscount) {
            form.setValue('discountPercentage', 0)
            form.setValue('originalPrice', null)
        }
    }, [hasDiscount, price, originalPrice, form])

    // Reset form para modo edit
    const resetForm = useCallback(() => {
        if (mode === 'edit' && initialData) {
            form.reset(getDefaultValues())
            replaceImages(initialData.images || [])
            replaceTags(initialData.tags || [])
            setHasUnsavedChanges(false)
            toast.info('Formulario restablecido')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, initialData, form, replaceImages, replaceTags])

    // Agregar etiqueta
    const addTag = useCallback(() => {
        if (newTag.trim()) {
            const tagExists = tagFields.some((field:FieldArrayItem) => field.value.toLowerCase() === newTag.trim().toLowerCase())
            if (!tagExists) {
                appendTag({ value: newTag.trim() })
                setNewTag('')
                toast.success('Etiqueta agregada')
            } else {
                toast.warning('Esta etiqueta ya existe')
            }
        }
    }, [newTag, tagFields, appendTag])

    // Manejar submit
    const handleSubmit = async (data: ProductFormData) => {
        setIsLoading(true)
        try {
            await onSubmit(data)
            setHasUnsavedChanges(false)
            toast.success(
                mode === 'create'
                    ? 'Producto creado exitosamente!'
                    : 'Producto actualizado exitosamente!'
            )
        } catch (error) {
            console.error(`Error al ${mode === 'create' ? 'crear' : 'actualizar'}:`, error)
            toast.error(
                mode === 'create'
                    ? 'Error al crear el producto'
                    : 'Error al actualizar el producto'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return {
        // Form
        form,
        imageFields,
        tagFields,
        appendImage,
        removeImage,
        appendTag,
        removeTag,
        replaceImages,
        replaceTags,

        // State
        isLoading,
        hasUnsavedChanges,
        newTag,
        setNewTag,

        // Categories
        categories,
        categoriesLoading,

        // Computed
        hasDiscount,
        price,
        originalPrice,

        // Methods
        addTag,
        resetForm,
        handleSubmit,

        // Metadata
        mode
    }
}