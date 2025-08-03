import { useCategory } from "@/core/hooks/useCategory";
import { CategoryCard } from "@/shared/components/category-card";
import { useEffect } from "react";

export const CategorySection = () => {
    const { getActiveCategories, categories } = useCategory()
    useEffect(() => {
        getActiveCategories()
    }, [])

    return (
        <>
            <div className="w-full dark:bg-gray-900 dark:text-gray-100">
                <div className="container w-full mx-auto px-4 py-18 lg:px-8 lg:py-10 ">
                    <div className="flex flex-wrap justify-center gap-6">
                        {categories.map((category) => (
                            <CategoryCard category={category} key={category.$id} href="/style" />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
