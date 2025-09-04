import type { CategoryInterface } from "../interfaces/category.interface"
import { create } from 'zustand';



interface CategoryState {
    categories: CategoryInterface[]
    setCategories: (categories: CategoryInterface[]) => void
    selectedCategory: CategoryInterface | null
    selectCategory: (category: CategoryInterface | null) => void
}


export const useCategoryStore = create<CategoryState>()((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories }),
    selectedCategory: null,
    selectCategory: (category) => set({ selectedCategory: category })
}))