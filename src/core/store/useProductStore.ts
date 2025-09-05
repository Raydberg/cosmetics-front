import { create, type StateCreator } from "zustand";
import { devtools } from 'zustand/middleware'

export interface ProductFilterStore {
    categoryIds: string[]
    priceRanges: string[]
    searchQuery: string
    priceSlider: [number, number]

    setCategoryIds: (ids: string[]) => void
    toggleCategory: (id: string) => void
    setPriceRanges: (ranges: string[]) => void
    setSearchQuery: (query: string) => void
    setPriceSlider: (range: [number, number]) => void
    resetFilters: () => void
    togglePriceRange: (range: string) => void
}

const storeApi: StateCreator<ProductFilterStore> = (set) => ({
    categoryIds: [],
    priceRanges: [],
    searchQuery: '',
    priceSlider: [0, 800],

    setCategoryIds: (ids: string[]) => set({ categoryIds: ids }),
    toggleCategory: (id: string) => set((state) => ({
        categoryIds: state.categoryIds.includes(id) ?
            state.categoryIds.filter(category => category !== id) :
            [...state.categoryIds, id]
    })),
    togglePriceRange: (range: string) => set((state) => ({
        priceRanges: state.priceRanges.includes(range) ?
            state.priceRanges.filter(r => r !== range) :
            [...state.priceRanges, range]
    })),
    setPriceRanges: (ranges: string[]) => set({ priceRanges: ranges }),
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    setPriceSlider: (range: [number, number]) => set({ priceSlider: range }),
    resetFilters: () => set({
        categoryIds: [],
        priceRanges: [],
        searchQuery: '',
        priceSlider: [0, 800]
    })
})

export const useProductStore = create<ProductFilterStore>()(
    devtools(storeApi)
)

export const useHasActiveFilters = () => useProductStore(state => 
    state.categoryIds.length > 0 || 
    state.priceRanges.length > 0 ||
    state.searchQuery !== '' ||
    state.priceSlider[0] > 0 ||
    state.priceSlider[1] < 800
);