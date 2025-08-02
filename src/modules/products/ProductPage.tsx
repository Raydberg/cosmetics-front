import { FilterProducts } from "@/shared/components/filter-products"
import { ProductCard } from "@/shared/components/product-card"

export const ProductPage = () => {
  return (
    <div className="flex">
      <FilterProducts />
      <div className="flex-1 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  )
}