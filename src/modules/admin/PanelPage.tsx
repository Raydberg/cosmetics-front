import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { LayoutGrid, PackageOpen } from "lucide-react"
import AdminProducts from "./products/AdminProducts"
import { CategoriesAdmin } from "./categories/CategoriesAdmin"

export const PanelPage = () => {
    return (
        <div>
            <Tabs defaultValue="products" className="w-full border p-5">
                <TabsList>
                    <TabsTrigger className="cursor-pointer" value="products">
                        <PackageOpen />
                        Productos
                    </TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="categories">
                        <LayoutGrid />
                        Categorias
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="products">
                    <AdminProducts />
                </TabsContent>
                <TabsContent value="categories">
                    <CategoriesAdmin />
                </TabsContent>
            </Tabs>

        </div>
    )
}
