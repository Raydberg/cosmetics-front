import { motion } from 'framer-motion'
import { Form } from '@/shared/components/ui/form'
import { Button } from '@/shared/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router'
import { ProductPreview } from './components/product-preview'
import { ProductInformation } from './components/product-information'
import { PriceSection } from './components/price-section'
import { ImagesSection } from './components/images-section'
import { TagsSections } from './components/tags-sections'
import { StateSection } from './components/state-section'
import { SummarySection } from './components/summary-section'
import type { ProductFormData } from '@/core/zod/admin/production-validation'
import { useProductForm } from '@/core/hooks/admin/useProductForm'
import type { ProductInterface } from '@/core/interfaces/product.interface'


export const NewProduct = () => {
  // Lógica para crear producto
  const handleCreateProduct = async (data: ProductFormData) => {
    console.log('Creando producto:', data)
    // Aquí iría la lógica real de creación
    // const result = await createProduct(data)
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simular
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
    handleSubmit
  } = useProductForm({
    mode: 'create',
    onSubmit: handleCreateProduct
  })

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
              formData={form.watch() as unknown as ProductInterface}
              categories={categories}
            />
          </div>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                    mode="create"
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
                    mode="create"
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
                        Creando...
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