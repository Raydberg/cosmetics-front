import { createContext } from "react"

export interface FilterState {
     selectCategories: string[],
     priceRange: [number]
}

interface FilterContextType {
     filters: FilterState
     toggleCategory: (categoryId: string) => void
     togglePriceRange: (priceId: string) => void
     clearFilters: () => void
     hasActiveFilters: boolean
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined)


