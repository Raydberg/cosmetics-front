
import { useFilters } from "@/core/hooks/useFilters"
import { useProduct } from "@/core/hooks/useProduct"
import { FilterProvider } from "@/core/providers/filter-provider"
import { FilterProducts } from "@/shared/components/filter-products"
import { InputSearch } from "@/shared/components/input-search"
import { ProductCard } from "@/shared/components/product-card"
import { Button } from "@/shared/components/ui/button"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { ProductList } from "./ProductList"
import { X } from "lucide-react"



const ProductsContent = () => {
    const { clearFilters, hasActiveFilters } = useFilters()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Productos
                </h1>
                {hasActiveFilters && (
                    <Button 
                        variant="outline" 
                        onClick={clearFilters}
                        className="flex items-center gap-2"
                    >
                        <X size={16} />
                        Limpiar filtros
                    </Button>
                )}
            </div>
            
            <div className="flex gap-8">
                <FilterProducts />
                <div className="flex-1">
                    <ProductList />
                </div>
            </div>
        </div>
    )
}

export const ProductPage = () => {
    return (
        <FilterProvider>
            <ProductsContent />
        </FilterProvider>
    )
}

// export const ProductPage = () => {
//   const { products, getActiveProducts } = useProduct()
//   const { clearFilters, hasActiveFilters } = useFilters()

//   useEffect(() => {
//     getActiveProducts()
//   }, [])


//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 }
//     }
//   }

//   return (
//     <FilterProvider>
//       <div className="flex">
//         <FilterProducts />
//         <div className="flex-1 min-h-screen">
//           <InputSearch />
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {
//               products.map((product) => (
//                 <motion.div key={product.$id} variants={itemVariants} >
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))
//             }

//           </motion.div>
//         </div>
//       </div>
//     </FilterProvider>
//   )
// }