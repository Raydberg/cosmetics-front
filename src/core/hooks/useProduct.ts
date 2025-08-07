import { useCallback, useState } from "react"
import type { ProductInterface } from "../interfaces/product.interface"
import { db, DB_ID, Query } from "../lib/appwrite"
import { COLLECTIONS } from "../config/collections"
import { ProductSchema } from "../zod/product-shemas"
import { getErrorMessage } from "../utils/getErrorMessage"


interface FilterOptions {
    categoryIds?: string[],
    priceRanges?: string[],
    searchQuery?: string
    priceSlider?: [number, number]
}

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


    const getFilteredProducts = useCallback(async (filters: FilterOptions) => {
        setLoading(true)
        setError(null)

        try {
            const queries = [Query.equal('isActive', true)]

            //filtro por categoria

            if (filters.categoryIds && filters.categoryIds.length > 0) {
                queries.push(Query.equal('categoryId', filters.categoryIds))
            }
            const result = await db.listDocuments(DB_ID, COLLECTIONS.PRODUCT, queries)


            let filteredProducts = result.documents.map(doc => {
                const validation = ProductSchema.safeParse(doc)
                return validation.data as ProductInterface
            })

            if (filters.priceSlider && (filters.priceSlider[0] > 0 || filters.priceSlider[1] < 800)) {
                const [minPrice, maxPrice] = filters.priceSlider
                filteredProducts = filteredProducts.filter(product =>
                    product.price >= minPrice && product.price <= maxPrice
                )
            }

            if (filters.priceRanges && filters.priceRanges.length > 0) {
                filteredProducts = filteredProducts.filter(product => {
                    return filters.priceRanges!.some(range => {
                        switch (range) {
                            case 'price1':
                                return product.price < 20
                            case 'price2':
                                return product.price >= 20 && product.price <= 50
                            case 'price3':
                                return product.price > 50
                            default:
                                return true
                        }
                    })
                })
            }

            if (filters.searchQuery && filters.searchQuery.trim() !== '') {
                const searchTerm = filters.searchQuery.toLowerCase()
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
                )
            }
            setProducts(filteredProducts)
            return filteredProducts;

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
        getProductById,
        getFilteredProducts
    }
}