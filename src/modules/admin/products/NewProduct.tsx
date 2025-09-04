import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { ArrowLeft} from 'lucide-react'
import { Link } from 'react-router'



export const NewProduct = () => {
   
 

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
           
          </div>
        </motion.div>


      </div>
    </div>
  )
}