import { useState } from "react"
import type { ProductInterface } from "../interfaces/product.interface"
import { db, DB_ID, Query } from "../lib/appwrite"
import { COLLECTIONS } from "../config/collections"
import { ProductSchema } from "../zod/product-shemas"
import { getErrorMessage } from "../utils/getErrorMessage"

export const useProduct = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const [error, setError] = useState<string | null>(null)

    const [products, setProducts] = useState<ProductInterface[]>([])


    const getActiveProducts = async () => {
        setLoading(true)
        setError(null)

        try {
            const result = await db.listDocuments(DB_ID, COLLECTIONS.PRODUCT, [
                Query.equal('isActive', true)
            ])
            console.log(result)
            const activeProductsData = result.documents.map(doc => {
                const validation = ProductSchema.safeParse(doc)
                return validation.data as ProductInterface
            })

            setProducts(activeProductsData)
            console.log(activeProductsData)
            return activeProductsData;
        } catch (error) {
            setError(getErrorMessage(error))
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return {
        products, loading, error,
        getActiveProducts
    }

}