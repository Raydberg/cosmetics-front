
import { useProduct } from "@/core/hooks/useProduct"
import { FilterProducts } from "@/shared/components/filter-products"
import { ProductCard } from "@/shared/components/product-card"
import { motion } from "framer-motion"
import { useEffect } from "react"

export const ProductPage = () => {
  const { products, getActiveProducts } = useProduct()

  useEffect(() => {
    getActiveProducts()
  }, [])


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="flex">
      <FilterProducts />
      <div className="flex-1 min-h-screen">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {
            products.map((product) => (
              <motion.div key={product.$id} variants={itemVariants} >
                <ProductCard product={product} />
              </motion.div>
            ))
          }

        </motion.div>
      </div>
    </div>
  )
}