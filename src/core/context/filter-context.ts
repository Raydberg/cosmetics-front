import { createContext } from "react"

export interface FilterState {
     selectCategories: string[],
     priceRange: string[],
     priceSlider: [number, number]
}

interface FilterContextType {
     filters: FilterState
     toggleCategory: (categoryId: string) => void
     togglePriceRange: (priceId: string) => void
     clearFilters: () => void
     setPriceSlider: (range: [number, number]) => void
     hasActiveFilters: boolean
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined)


