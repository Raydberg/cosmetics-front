export interface CategoryInterface {
    $id?: string
    name: string
    slug: string
    isActive: boolean
    image?: string | null
    description?: string
    $createdAt?: string
    $updatedAt?: string
    $collectionId?: string
    $databaseId?: string
    $permissions?: string[]
}

export type CreateCategoryInterface = Omit<CategoryInterface, 
    '$id' | '$createdAt' | '$updatedAt' | '$collectionId' | '$databaseId' | '$permissions'
>