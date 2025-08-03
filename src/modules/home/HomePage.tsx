import { ProductCard } from "@/shared/components/product-card"
import { Button } from "@/shared/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { CategorySection } from "../categories/CategorySection"
import { CustomCarousel } from "@/shared/components/custom-carousel"
import { data_example } from "@/core/api/data-example"

export const HomePage = () => {
  return (
    <div>
      <CustomCarousel />
      <section className=" flex flex-col items-center ">
        <h1 className="font-bold text-2xl">Nuestras Categorias</h1>
        <CategorySection />
      </section>
      <section className="border flex flex-col items-center space-y-5">
        <h1 className="font-bold text-2xl">Productos Destacados</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 space-x-2">
          {
            data_example.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          }
        </div>
        <div>
          <Button>
            <Link to={'/products'}>
              Ver todos los Productos
            </Link>
            <ArrowRight />
          </Button>
        </div>
      </section>
    </div>
  )
}
