import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
import { AdminCategoryItem } from "../components/admin-category-item"

export const CategoriesAdmin = () => {
    return (
        <div className="w-full space-y-3">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Gestionar Categorias</h1>
                <Button>
                    <Plus />
                    Nueva Categoria
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                <AdminCategoryItem  title="Belleza" slug="belleza" />
                <AdminCategoryItem title="Niños" slug="niños" />
                <AdminCategoryItem title="Mujeres" slug="mujeres" />
                <AdminCategoryItem title="Hombres" slug="hombres" />
                {/* <AdminCategoryItem /> */}
            </div>
        </div>
    )
}
