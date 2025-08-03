export interface ProductModel {
    $id?: string
    name: string
    description: string
    price: number
    originalPrice?: number
    discountPercentage?: number
    hasDiscount: boolean
    images: string[]
    categoryId: string
    stock: number
    featured: boolean
    isActive: boolean
    tags?: string[]
    brand?: string

}
export type CreateProduct = Omit<ProductModel, '$id'>