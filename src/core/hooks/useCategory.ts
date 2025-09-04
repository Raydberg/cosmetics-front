import { useQuery } from "@tanstack/react-query"
import { useCategoryStore } from "../store/useCategoryStore";
import { CategoryService } from "../services/category.service";


export const useCategory = () => {
    // const queryClient = useQueryClient();
    const { setCategories, selectedCategory, selectCategory } = useCategoryStore();

    const categoryQuery = useQuery({
        queryKey: ['categories'],
        queryFn: CategoryService.getAllCategories,
        staleTime: 1000 * 60 * 60
    })
    const categoryActiveQuery = useQuery({
        queryKey: ['category-active'],
        queryFn: CategoryService.getActiveCategories,
        staleTime: 1000 * 60 * 60
    })

    const useCategoryId = (categoryId: string) => {
        return useQuery({
            queryKey: ['categories', categoryId],
            queryFn: () => CategoryService.getCategoryId(categoryId)
        });
    }

    
    return {
        setCategories,
        selectedCategory,
        selectCategory,
        categoryQuery,
        categoryActiveQuery,
        useCategoryId
    }
}