import { CategoryCard } from "@/shared/components/category-card";

export const CategorySection = () => {
    return (
        <>
            <div className="w-full dark:bg-gray-900 dark:text-gray-100">
                <div className="container w-full mx-auto px-4 py-18 lg:px-8 lg:py-10 ">
                    <div className="flex flex-wrap justify-center gap-6">
                        <CategoryCard name="Belleza" href="/style" />
                        <CategoryCard name="Niños" href="/style" />
                        <CategoryCard name="Hombres" href="/style" />
                        <CategoryCard name="Mujeres" href="/style" />
                    </div>
                </div>
            </div>
        </>
    );
}
