import { ProductCard } from "@/shared/components/product-card"
import { Button } from "@/shared/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { CategorySection } from "./components/CategorySection"
import { useProduct } from "@/modules/client/hooks/useProduct"


export const LandingPage = () => {
  const { activeProductsQuery } = useProduct({})


  return (
    <div>
      <section className=" flex flex-col items-center ">
        <h1 className="font-bold text-2xl">Nuestras Categorias</h1>
        <CategorySection />
      </section>
      <section className="flex flex-col items-center space-y-5">
        <h1 className="font-bold text-2xl">Productos Destacados</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 space-x-2">
          {
            activeProductsQuery.data?.filter(product => product.featured).map((product) => (
              <ProductCard key={product.$id} product={product} />
            ))
          }
        </div>
        <div>
          <Button>
            <Link to={'/products'} viewTransition>
              Ver todos los Productos
            </Link>
            <ArrowRight />
          </Button>
        </div>
      </section>
    </div>
  )
}
