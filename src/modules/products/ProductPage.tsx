import { FilterProducts } from "@/shared/components/filter-products"
import { ProductCard } from "@/shared/components/product-card"
import { motion } from "framer-motion"

export const ProductPage = () => {
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
          {[...Array(6)].map((_, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProductCard />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}