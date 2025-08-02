import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"

export const CategoriesAdmin = () => {
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h1>Gestionar Categorias</h1>
                <Button>
                    <Plus />
                    Nueva Categoria
                </Button>
            </div>
        </div>
    )
}
