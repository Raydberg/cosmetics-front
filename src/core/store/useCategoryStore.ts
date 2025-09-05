import { devtools } from "zustand/middleware";
import type { CategoryInterface } from "../interfaces/category.interface"
import { create, type StateCreator } from 'zustand';



interface CategoryState {
    categories: CategoryInterface[]
    setCategories: (categories: CategoryInterface[]) => void
    selectedCategory: CategoryInterface | null
    selectCategory: (category: CategoryInterface | null) => void
}


const storeApi: StateCreator<CategoryState> = (set) => ({
    categories: [],
    setCategories: (categories) => set({ categories }),
    selectedCategory: null,
    selectCategory: (category) => set({ selectedCategory: category })
})


export const useCategoryStore = create<CategoryState>()(
    devtools(
        storeApi
    )
)