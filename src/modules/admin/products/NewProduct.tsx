import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/shared/components/ui/form'
import { Button } from '@/shared/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import { useCategory } from '@/core/hooks/useCategory'
import { toast } from 'sonner'
import { Link } from 'react-router'
import { ProductPreview } from './components/product-preview'
import { productAdminSchema } from '@/core/zod/admin/production-validation'
import { ProductInformation } from './components/product-information'
import { PriceSection } from './components/price-section'
import { ImagesSection } from './components/images-section'
import { TagsSections } from './components/tags-sections'
import { StateSection } from './components/state-section'
import { SummarySection } from './components/summary-section'

type ProductFormData = z.infer<typeof productAdminSchema>

export const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { categories, getActiveCategories, loading: categoriesLoading } = useCategory()

  // ✅ Form con valores por defecto explícitos
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productAdminSchema),
    defaultValues: {
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
  })

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: 'images'
  })

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control: form.control,
    name: 'tags'
  })

  useEffect(() => {
    getActiveCategories()
  }, [getActiveCategories])

  // Observar cambios en hasDiscount y originalPrice
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

  const addImage = useCallback(() => {
    if (newImageUrl.trim()) {
      try {
        new URL(newImageUrl) // Validar URL
        appendImage(newImageUrl.trim())
        setNewImageUrl('')
        setPreviewImage(null)
        toast.success('Imagen agregada correctamente')
      } catch {
        toast.error('URL de imagen inválida')
      }
    }
  }, [newImageUrl, appendImage])

  const addTag = useCallback(() => {
    if (newTag.trim()) {
      const tagExists = tagFields.some(field => field.value.toLowerCase() === newTag.trim().toLowerCase())
      if (!tagExists) {
        appendTag(newTag.trim())
        setNewTag('')
        toast.success('Etiqueta agregada')
      } else {
        toast.warning('Esta etiqueta ya existe')
      }
    }
  }, [newTag, tagFields, appendTag])

  const previewImageUrl = useCallback((url: string) => {
    try {
      new URL(url)
      setPreviewImage(url)
    } catch {
      setPreviewImage(null)
    }
  }, [])

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true)
    try {
      console.log('Datos del producto:', data)
      // Aquí iría la lógica para guardar el producto
      // const result = await createProduct(data)

      await new Promise(resolve => setTimeout(resolve, 2000)) 

      toast.success('Producto creado exitosamente!')

      // Opcional: resetear el formulario
      // form.reset()

    } catch (error) {
      console.error('Error al guardar:', error)
      toast.error('Error al crear el producto')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link to={'/admin'} className='cursor-pointer'>
              <Button variant="outline" size="sm" type="button">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Nuevo Producto
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Completa la información para crear un nuevo producto
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ProductPreview
              formData={form.watch()}
              categories={categories}
            />
          </div>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna principal - Información básica */}
              <div className="lg:col-span-2 space-y-6">

                {/* Información básica */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >


                  <ProductInformation
                    form={form}
                    categoriesLoading={categoriesLoading}
                    categories={categories}
                  />

                </motion.div>

                {/* Precios */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >


                  <PriceSection
                    form={form}
                    hasDiscount={hasDiscount}
                  />


                </motion.div>

                {/* Imágenes */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >

                  <ImagesSection
                    imageFields={imageFields}
                    removeImage={removeImage}
                    form={form}
                    appendImage={appendImage}
                  />


                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >


                  <TagsSections
                    newTag={newTag}
                    setNewTag={setNewTag}
                    addTag={addTag}
                    tagFields={tagFields}
                    removeTag={removeTag}
                  />

                </motion.div>


              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Estados */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >

                  <StateSection
                    form={form}
                  />

                </motion.div>

                {/* Resumen */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >


                  <SummarySection
                    imageFields={imageFields}
                    tagFields={tagFields}
                    price={price}
                    hasDiscount={hasDiscount}
                    originalPrice={originalPrice}
                    form={form}
                  />

                </motion.div>

                {/* Acciones */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Guardando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Crear Producto
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Lógica para guardar como borrador
                      toast.info('Producto guardado como borrador')
                    }}
                  >
                    Guardar como borrador
                  </Button>
                </motion.div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}