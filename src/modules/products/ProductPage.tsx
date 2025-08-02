import { FilterProducts } from "@/shared/components/filter-products"
import { ProductCard } from "@/shared/components/product-card"

export const ProductPage = () => {
  return (
    <div className="flex">
      <FilterProducts />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}
