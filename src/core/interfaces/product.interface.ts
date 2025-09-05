import type { CategoryInterface } from "./category.interface"

export interface ProductInterface {
    $id?: string
    name: string
    description: string
    price: number
    originalPrice?: number | null
    discountPercentage?: number
    hasDiscount: boolean
    images: string[]
    categoryId: CategoryInterface
    stock: number
    featured: boolean
    isActive: boolean
    tags?: string[]
    brand?: string
    $createdAt?: string
    $updatedAt?: string
    $collectionId?: string
    $databaseId?: string
    $permissions?: string[]
}
export type CreateProduct = Omit<ProductInterface, '$id' | '$createdAt' | '$updatedAt' | '$collectionId' | '$databaseId' | '$permissions'>