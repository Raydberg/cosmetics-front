
import { FilterProducts } from "@/shared/components/filter-products"
import { Button } from "@/shared/components/ui/button"
import { ProductList } from "./ProductList"
import { X } from "lucide-react"
import { InputSearch } from "@/shared/components/input-search"
import { useProduct } from "../hooks/useProduct"



export const ProductPage = () => {
    const { filters, filterActions } = useProduct({})
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header con título y botón limpiar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Productos
                </h1>
                {filters.hasActiveFilters && (
                    <Button
                        variant="outline"
                        onClick={filterActions.resetFilters}
                        className="flex items-center gap-2 w-fit"
                    >
                        <X size={16} />
                        Limpiar filtros
                    </Button>
                )}
            </div>

            <div className="mb-8">
                <InputSearch
                    onSearch={(e) => filterActions.setSearchQuery(e)}
                    className="w-full max-w-3xl mx-auto"
                    enableRealTimeSearch={true}
                    debounceDelay={300}
                />

                {filters.searchQuery && (
                    <div className="mt-3 text-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm">
                            Buscando: "{filters.searchQuery}"
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => filterActions.setSearchQuery('')}
                                className="h-4 w-4 p-0 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full"
                            >
                                <X size={12} />
                            </Button>
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-80 shrink-0">
                    <FilterProducts />
                </div>

                <div className="flex-1 min-w-0">
                    <ProductList />
                </div>
            </div>
        </div>
    )
}

