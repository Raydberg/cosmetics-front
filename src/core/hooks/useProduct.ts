import { useCallback, useState } from "react"
import type { ProductInterface } from "../interfaces/product.interface"
import { db, DB_ID, Query } from "../lib/appwrite"
import { COLLECTIONS } from "../config/collections"
import { ProductSchema } from "../zod/product-shemas"
import { getErrorMessage } from "../utils/getErrorMessage"

export const useProduct = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const [error, setError] = useState<string | null>(null)

    const [products, setProducts] = useState<ProductInterface[]>([])


    const getActiveProducts = useCallback(async () => {
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
    }, [])

    const getProductById = useCallback(async (productId: string) => {
        setLoading(true);
        setError(null)
        try {
            console.log("Fetching product with ID", productId)

            const result = await db.getDocument(DB_ID, COLLECTIONS.PRODUCT, productId)
            console.log("Raw result form appwrite", result)
            const validation = ProductSchema.safeParse(result)
            console.log("Product validation successfull:", validation.data)
            if (validation.success) {
                return validation.data as ProductInterface
            } else {
                throw new Error("Datos de producto invalidos")
            }
        } catch (error) {
            setError(getErrorMessage(error))
            console.error("Error obteniendo producto:", error)
            throw error;
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        products, loading, error,
        getActiveProducts,
        getProductById
    }
}