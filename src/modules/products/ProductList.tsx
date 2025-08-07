import { useFilters } from "@/core/hooks/useFilters"
import { useProduct } from "@/core/hooks/useProduct"
import { useEffect } from "react"
import { motion } from 'framer-motion';
import { ProductCard } from "@/shared/components/product-card";

export const ProductList = () => {
    const { products, loading, error, getActiveProducts, getFilteredProducts } = useProduct()

    const { filters, hasActiveFilters } = useFilters()
    useEffect(() => {
        if (hasActiveFilters) {
            getFilteredProducts({
                categoryIds: filters.selectCategories,
                priceRanges: filters.priceRange,
                priceSlider:filters.priceSlider,
                searchQuery:filters.searchQuery
            })
        } else {
            getActiveProducts()
        }

        return () => {

        }
    }, [filters, hasActiveFilters, getFilteredProducts, getActiveProducts])

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-300 rounded-xl h-80 mb-4"></div>
                        <div className="bg-gray-300 rounded h-4 mb-2"></div>
                        <div className="bg-gray-300 rounded h-4 w-3/4"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <button
                    onClick={() => hasActiveFilters ? getFilteredProducts({
                        categoryIds: filters.selectCategories,
                        priceRanges: filters.priceRange
                    }) : getActiveProducts()}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                    Reintentar
                </button>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No se encontraron productos
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    {hasActiveFilters
                        ? 'Intenta ajustar los filtros para encontrar más productos.'
                        : 'No hay productos disponibles en este momento.'
                    }
                </p>
            </div>
        )
    }
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {products.map((product, index) => (
                <motion.div
                    key={product.$id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </motion.div>
    )
}
