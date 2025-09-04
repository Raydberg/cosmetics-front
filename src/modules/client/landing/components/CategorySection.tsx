import { useCategory } from "@/core/hooks/useCategory";
import { CategoryCard } from "@/shared/components/category-card";

export const CategorySection = () => {
    const { categoryActiveQuery } = useCategory()


    if (categoryActiveQuery.data === null) {
        return <div>No hay categorias</div>
    }
    console.log(categoryActiveQuery.data)
    return (
        <>
            <div className="w-full dark:bg-gray-900 dark:text-gray-100">
                <div className="container w-full mx-auto px-4 py-18 lg:px-8 lg:py-10 ">
                    <div className="flex flex-wrap justify-center gap-6">
                        {
                            categoryActiveQuery.data?.map((category) => (
                                category.image && (
                                    <CategoryCard category={category} key={category.$id} />
                                )
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
