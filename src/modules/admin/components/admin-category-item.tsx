import type { CategoryInterface } from "@/core/interfaces/category.interface"
import { cn } from "@/core/lib/utils"
import { Button } from "@/shared/components/ui/button"
import { Pencil, Trash } from "lucide-react"

interface CategoryItemsProps {
    category: CategoryInterface
    className?: string
}

export const AdminCategoryItem = ({ category, className, ...props }: CategoryItemsProps) => {
    return (
        <div {...props} className={cn(
            "block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",
            className
        )}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {category.name}
            </h5>
            <div className="flex items-center justify-between">
                <p className="font-normal text-gray-500 dark:text-gray-400">
                    Slug: {category.slug}
                </p>
                <div className="space-x-3">
                    <Button
                        onClick={() => alert("Editar categoria")}
                        className="cursor-pointer" variant={'secondary'}>
                        <Pencil />
                    </Button>
                    <Button
                        className="cursor-pointer"
                        onClick={() => alert("Eliminar Categoria")}
                        variant={'destructive'}>
                        <Trash />
                    </Button>
                </div>
            </div>
        </div>
    )
}
