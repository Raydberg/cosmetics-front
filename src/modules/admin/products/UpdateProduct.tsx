import { useState, useEffect, useTransition, useDeferredValue } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router'
import { Form } from '@/shared/components/ui/form'
import { Button } from '@/shared/components/ui/button'
import { ArrowLeft, Save, AlertCircle, RefreshCw, WifiOff } from 'lucide-react'
import { useProduct } from '@/core/hooks/useProduct'
import { toast } from 'sonner'
import { Link } from 'react-router'
import { ProductPreview } from './components/product-preview'
import type { ProductInterface } from '@/core/interfaces/product.interface'
import type { ProductFormData } from '@/core/zod/admin/production-validation'
import { ProductInformation } from './components/product-information'
import { PriceSection } from './components/price-section'
import { ImagesSection } from './components/images-section'
import { TagsSections } from './components/tags-sections'
import { StateSection } from './components/state-section'
import { SummarySection } from './components/summary-section'
import { useProductForm } from '@/core/hooks/admin/useProductForm'
import { useProductAdmin } from '@/core/hooks/admin/useProductAdmin'

export const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>()
  const [isPending, startTransition] = useTransition()
  const { updateProduct } = useProductAdmin()
  const [currentProduct, setCurrentProduct] = useState<ProductInterface | null>(null)
  const [isLoadingProduct, setIsLoadingProduct] = useState(true)
  const [isNetworkError, setIsNetworkError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const { getProductById } = useProduct()
  const navigate = useNavigate()
  const deferredProduct = useDeferredValue(currentProduct);

  useEffect(() => {
    loadProduct()
  }, [id])
  // Función para cargar el producto con manejo de errores de red
  const loadProduct = async () => {
    if (!id) return

    setIsLoadingProduct(true)
    setIsNetworkError(false)

    try {
      const product = await getProductById(id, true)
      // console.log(`Producto con id ${id}`, product)
      setCurrentProduct(product)
    } catch (error) {
      console.error('Error cargando producto:', error)

      // Determinar si es error de red
      if (error instanceof TypeError &&
        (error.message.includes('NetworkError') || error.message.includes('Failed to fetch'))) {
        setIsNetworkError(true)
      }

      toast.error('Error al cargar el producto')
    } finally {
      setIsLoadingProduct(false)
    }
  }




  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!id) return
    try {
      await updateProduct(id, data)
      toast.success('Producto actualizado correctamente')
      navigate('/admin')
    } catch (error) {
      console.error('Error actualizando producto:', error)
      toast.error('Error al actualizar el producto')
    }
  }

  const {
    form,
    imageFields,
    tagFields,
    appendImage,
    removeImage,
    removeTag,
    isLoading,
    newTag,
    setNewTag,
    categories,
    categoriesLoading,
    hasDiscount,
    price,
    originalPrice,
    addTag,
    handleSubmit: formSubmitHandler
  } = useProductForm({
    mode: 'edit',
    initialData: deferredProduct,
    onSubmit: handleUpdateProduct
  })
  console.log("Producto actual", currentProduct)
  console.log("Form", form)
  useEffect(() => {
    if (currentProduct) {
      form.reset({
        ...currentProduct,
        // Transforma categoryId a string si es un objeto
        categoryId: typeof currentProduct.categoryId === "object" && currentProduct.categoryId !== null
          ? currentProduct.categoryId.$id
          : currentProduct.categoryId ?? "",
        // Asegúrate de que las imágenes sean un array de strings
        images: Array.isArray(currentProduct.images)
          ? currentProduct.images
          : [],
        // Transforma brand a string vacío si es null
        brand: currentProduct.brand || "",
        // Asegúrate de que las etiquetas sean un array de strings
        tags: Array.isArray(currentProduct.tags) ? currentProduct.tags : [],
      });
    }
  }, [currentProduct, form]);
  // Estado de carga
  if (isLoadingProduct || isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4"
              >
                <RefreshCw className="h-8 w-8 text-purple-600" />
              </motion.div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Cargando producto...
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Por favor espera mientras cargamos la información
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Estado de error de red específico
  if (isNetworkError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <WifiOff className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Error de conexión
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No se pudo conectar con el servidor. Verifica tu conexión a internet.
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={loadProduct} variant="default">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reintentar
                </Button>
                <Link to="/admin">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al panel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Estado de error general
  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Error al cargar el producto
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No se pudo cargar la información del producto. Por favor intenta nuevamente.
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={loadProduct} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reintentar
                </Button>
                <Link to="/admin">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al panel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
                Editar Producto
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {currentProduct?.name || 'Actualiza la información del producto'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ProductPreview
              formData={form.watch() as unknown as ProductInterface}
              categories={categories}
            />
          </div>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmitHandler)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna principal */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <ProductInformation
                    form={form}
                    categoriesLoading={categoriesLoading}
                    categories={categories}
                    mode="edit"
                  />
                </motion.div>

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
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <StateSection form={form} />
                </motion.div>

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
                    mode="edit"
                  />
                </motion.div>

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
                        Actualizando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Actualizar Producto
                      </div>
                    )}
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