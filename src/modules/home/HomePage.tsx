import { CategoryCard } from "@/shared/components/category-card"
import { ProductCard } from "@/shared/components/product-card"
import { Button } from "@/shared/components/ui/button"
import { ArrowRight } from "lucide-react"

export const HomePage = () => {
  return (
    <div>
      <h1>Nuetras Categorias</h1>
      <div>
        <CategoryCard />
      </div>
      <section className="border flex flex-col items-center space-y-5">
        <h1 className="font-bold text-2xl">Productos Destacados</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 space-x-2">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <div>
          <Button>
            Ver todos los Productos
            <ArrowRight />
          </Button>
        </div>
      </section>
    </div>
  )
}
