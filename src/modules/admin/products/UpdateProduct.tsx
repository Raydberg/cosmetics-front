import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'


export const UpdateProduct = () => {



  




  // // Estado de error general
  // if (!currentProduct) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
  //       <div className="container mx-auto px-4 py-8 max-w-5xl">
  //         <div className="flex items-center justify-center h-96">
  //           <div className="text-center">
  //             <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
  //             <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
  //               Error al cargar el producto
  //             </h2>
  //             <p className="text-gray-600 dark:text-gray-400 mb-4">
  //               No se pudo cargar la información del producto. Por favor intenta nuevamente.
  //             </p>
  //             <div className="flex gap-2 justify-center">
  //               <Button onClick={loadProduct} variant="outline">
  //                 <RefreshCw className="h-4 w-4 mr-2" />
  //                 Reintentar
  //               </Button>
  //               <Link to="/admin">
  //                 <Button>
  //                   <ArrowLeft className="h-4 w-4 mr-2" />
  //                   Volver al panel
  //                 </Button>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

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
                {'Actualiza la información del producto'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* <ProductPreview
              formData={form.watch() as unknown as ProductInterface}
              categories={categories}
            /> */}
          </div>
        </motion.div>

      </div>
    </div>
  )
}