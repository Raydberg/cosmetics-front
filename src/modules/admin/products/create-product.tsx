import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { Switch } from '@/shared/components/ui/switch'
import { Badge } from '@/shared/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select'
import { Separator } from '@/shared/components/ui/separator'
import {
  X,
  Plus,
  ImageIcon,
  Package,
  DollarSign,
  Tag,
  Info,
  ArrowLeft,
  Save,
  Eye,
  Sparkles
} from 'lucide-react'
import { useCategory } from '@/core/hooks/useCategory'
import { toast } from 'sonner'
import { Link } from 'react-router'

// ✅ Schema de validación corregido - todos los campos opcionales explícitos
const productSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(10, 'Mínimo 10 caracteres').max(500, 'Máximo 500 caracteres'),
  price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  originalPrice: z.number().optional().nullable(),
  discountPercentage: z.number().min(0).max(100).optional(),
  hasDiscount: z.boolean().optional(),
  images: z.array(z.string().url('URL inválida')).min(1, 'Mínimo 1 imagen requerida'),
  categoryId: z.string().min(1, 'Categoría requerida'),
  stock: z.number().int().min(0, 'Stock debe ser mayor o igual a 0'),
  featured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  brand: z.string().optional().nullable(),
  tags: z.array(z.string()).optional()
})

type ProductFormData = z.infer<typeof productSchema>

export const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { categories, getActiveCategories, loading: categoriesLoading } = useCategory()

  // ✅ Form con valores por defecto explícitos
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
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

      await new Promise(resolve => setTimeout(resolve, 2000)) // Simular guardado

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
            <Button variant="outline" size="sm" type="button">
              <Eye className="h-4 w-4 mr-2" />
              Vista previa
            </Button>
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-purple-600" />
                        Información del Producto
                      </CardTitle>
                      <CardDescription>
                        Información básica y descripción del producto
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del producto *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ej: Perfume Elegance Premium"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe las características y beneficios del producto..."
                                rows={4}
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                              />
                            </FormControl>
                            <FormDescription>
                              {field.value?.length || 0}/500 caracteres
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="brand"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Marca</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ej: Elegance Paris"
                                  {...field}
                                  value={field.value || ''}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="categoryId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Categoría *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una categoría" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categoriesLoading ? (
                                    <SelectItem value="loading" disabled>
                                      Cargando categorías...
                                    </SelectItem>
                                  ) : (
                                    categories.map((category) => (
                                      <SelectItem key={category.$id} value={category.$id!}>
                                        {category.name}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Precios */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Precios y Descuentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio actual *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">S/.</span>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    className="pl-10"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock disponible *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="0"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      <FormField
                        control={form.control}
                        name="hasDiscount"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">
                                ¿Tiene descuento?
                              </FormLabel>
                              <FormDescription>
                                Activa si el producto tiene precio rebajado
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <AnimatePresence>
                        {hasDiscount && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="originalPrice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Precio original</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">S/.</span>
                                        <Input
                                          type="number"
                                          step="0.01"
                                          min="0"
                                          placeholder="0.00"
                                          className="pl-10"
                                          value={field.value || ''}
                                          onChange={(e) => field.onChange(parseFloat(e.target.value) || null)}
                                        />
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="discountPercentage"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Descuento (%)</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type="number"
                                          min="0"
                                          max="100"
                                          placeholder="0"
                                          value={field.value || 0}
                                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                          readOnly
                                          className="bg-gray-50"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                      </div>
                                    </FormControl>
                                    <FormDescription>
                                      Se calcula automáticamente
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Imágenes */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-blue-600" />
                        Imágenes del Producto
                      </CardTitle>
                      <CardDescription>
                        Agrega URLs de las imágenes del producto (mínimo 1 requerida)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="https://ejemplo.com/imagen.jpg"
                          value={newImageUrl}
                          onChange={(e) => {
                            setNewImageUrl(e.target.value)
                            previewImageUrl(e.target.value)
                          }}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addImage}
                          disabled={!newImageUrl.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {previewImage && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative w-20 h-20 rounded-lg overflow-hidden border"
                        >
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <AnimatePresence>
                          {imageFields.map((field, index) => (
                            <motion.div
                              key={field.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="relative group"
                            >
                              <div className="aspect-square rounded-lg overflow-hidden border bg-gray-50">
                                <img
                                  src={field.value}
                                  alt={`Imagen ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/200x200?text=Error'
                                  }}
                                />
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-orange-600" />
                        Etiquetas
                      </CardTitle>
                      <CardDescription>
                        Agrega etiquetas para mejorar la búsqueda del producto
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ej: perfume, lujo, floral"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          disabled={!newTag.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                          {tagFields.map((field, index) => (
                            <motion.div
                              key={field.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                            >
                              <Badge variant="secondary" className="flex items-center gap-1">
                                {field.value}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 hover:bg-transparent"
                                  onClick={() => removeTag(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-600" />
                        Estado del Producto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Producto activo</FormLabel>
                              <FormDescription className="text-xs">
                                Visible en la tienda
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel className="flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                Destacado
                              </FormLabel>
                              <FormDescription className="text-xs">
                                Aparece en productos destacados
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Resumen */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Resumen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Imágenes:</span>
                        <span className="font-medium">{imageFields.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Etiquetas:</span>
                        <span className="font-medium">{tagFields.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Precio:</span>
                        <span className="font-medium">S/. {price || 0}</span>
                      </div>
                      {hasDiscount && originalPrice && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Descuento:</span>
                          <span className="font-medium text-green-600">
                            {form.watch('discountPercentage') || 0}%
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
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