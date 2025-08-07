import { useState, type ReactNode } from "react"
import { FilterContext, type FilterState } from "../context/filter-context"

interface FilterProviderProps {
    children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
    const [filters, setFilters] = useState<FilterState>({
        selectCategories: [],
        priceRange: []
    })


    const toggleCategory = (categoryId: string) => {
        setFilters(prev => ({
            ...prev, selectCategories: prev.selectCategories.includes(categoryId) ?
                prev.selectCategories.filter(id => id !== categoryId) :
                [...prev.selectCategories, categoryId]
        }))
    }

    const togglePriceRange = (priceId: string) => {
        setFilters(prev => ({
            ...prev, priceRange: prev.priceRange.includes(priceId) ?
                prev.priceRange.filter(id => id !== priceId) :
                [...prev.priceRange, priceId]
        }))
    }
    const clearFilters = () => {
        setFilters({
            selectCategories: [],
            priceRange: []
        })
    }

    const hasActiveFilters = filters.selectCategories.length > 0 || filters.priceRange.length > 0

    return (
        <FilterContext.Provider value={{
            filters,
            toggleCategory,
            togglePriceRange,
            clearFilters,
            hasActiveFilters
        }}>
            {children}
        </FilterContext.Provider>
    )
}