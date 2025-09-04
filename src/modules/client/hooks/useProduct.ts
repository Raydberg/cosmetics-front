import { useCallback, useRef, useState } from "react"
import type { ProductInterface } from "../../../core/interfaces/product.interface"
import { db, DB_ID, Query } from "../../../core/lib/appwrite"
import { COLLECTIONS } from "../../../core/config/collections"
import { ProductSchema } from "../../../core/zod/product-shemas"
import { getErrorMessage } from "../../../core/utils/getErrorMessage"
import { useCache } from "../../../core/hooks/useCache"


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
    const dataLoadedRef = useRef<Record<string, boolean>>({})
    const productCache = useCache<ProductInterface[]>({
        defaultTTL: 10 * 60 * 1000,//-> 10 min
        maxSize: 60
    })
    const searchCache = useCache<ProductInterface[]>({
        defaultTTL: 5 * 60 * 1000, //-> 5 min
        maxSize: 30
    })


    //Generacion de clave unicas para filtros

    const generateCacheKey = useCallback((filters: FilterOptions): string => {
        const parts: string[] = []


        if (filters.categoryIds?.length) {
            parts.push(`cat:${filters.categoryIds.sort().join(',')}`)
        }

        if (filters.priceRanges?.length) {
            parts.push(`cat:${filters.priceRanges.sort().join(',')}`)
        }

        if (filters.searchQuery?.length) {
            parts.push(`cat:${filters.searchQuery.trim().toLocaleLowerCase()}`)
        }

        if (filters.priceSlider) {

            const [min, max] = filters.priceSlider
            if (min > 0 || max < 800) {
                parts.push(`slider:${min}-${max}`)
            }

        }
        return parts.length > 0 ? parts.join('|') : 'all-active';
    }, [])


    const getActiveProducts = useCallback(async (forceRefresh = false): Promise<ProductInterface[]> => {

        const cacheKey = 'all-active-products'
        if (products.length > 0 && dataLoadedRef.current[cacheKey] && !forceRefresh) {
            return products
        }
        //Verificar en el cache
        const cacheData = productCache.get(cacheKey)
        if (cacheData && !forceRefresh) {
            console.log("Usando data de la cache")
            setProducts(cacheData)
            dataLoadedRef.current[cacheKey] = true
            return cacheData;
        }

        setLoading(true)
        setError(null)

        try {
            const result = await db.listDocuments(DB_ID, COLLECTIONS.PRODUCT, [
                Query.equal('isActive', true)
            ])
            // console.log(result)
            const activeProductsData = result.documents.map(doc => {
                const validation = ProductSchema.safeParse(doc)
                return validation.data as ProductInterface
            })
            //guardamos en cache

            productCache.set(cacheKey, activeProductsData)
            setProducts(activeProductsData)
            dataLoadedRef.current[cacheKey] = true
            return activeProductsData;
        } catch (error) {
            setError(getErrorMessage(error))
            throw error;
        } finally {
            setLoading(false)
        }
    }, [productCache])


    // Obtener productos filtrados con cache inteligente
    const getFilteredProducts = useCallback(async (filters: FilterOptions): Promise<ProductInterface[]> => {
        const cacheKey = generateCacheKey(filters)

        // Verificar cache primero
        const cachedData = searchCache.get(cacheKey)
        if (cachedData) {
            console.log(`📦 Using cached filtered products for: ${cacheKey}`)
            setProducts(cachedData)
            return cachedData
        }

        setLoading(true)
        setError(null)

        try {
            console.log(`🌐 Fetching filtered products for: ${cacheKey}`)

            // Intentar obtener productos base del cache primero
            let baseProducts: ProductInterface[] | null = null

            if (filters.categoryIds?.length) {
                // Para filtros por categoría, hacer query directo
                const queries = [
                    Query.equal('isActive', true),
                    Query.equal('categoryId', filters.categoryIds)
                ]

                const result = await db.listDocuments(DB_ID, COLLECTIONS.PRODUCT, queries)
                baseProducts = result.documents.map(doc => {
                    const validation = ProductSchema.safeParse(doc)
                    return validation.data as ProductInterface
                })
            } else {
                // Para otros filtros, usar productos activos
                baseProducts = productCache.get('all-active-products')
                if (!baseProducts) {
                    baseProducts = await getActiveProducts()
                }
            }

            let filteredProducts = [...baseProducts]

            // Aplicar filtros en memoria (más rápido)

            // Filtro por slider de precio
            if (filters.priceSlider && (filters.priceSlider[0] > 0 || filters.priceSlider[1] < 800)) {
                const [minPrice, maxPrice] = filters.priceSlider
                filteredProducts = filteredProducts.filter(product =>
                    product.price >= minPrice && product.price <= maxPrice
                )
            }

            // Filtro por rangos de precio predefinidos
            if (filters.priceRanges?.length) {
                filteredProducts = filteredProducts.filter(product => {
                    return filters.priceRanges!.some(range => {
                        switch (range) {
                            case 'price1': return product.price < 20
                            case 'price2': return product.price >= 20 && product.price <= 50
                            case 'price3': return product.price > 50
                            default: return true
                        }
                    })
                })
            }

            // Filtro por búsqueda (con cache separado para términos de búsqueda)
            if (filters.searchQuery?.trim()) {
                const searchTerm = filters.searchQuery.toLowerCase().trim()
                const searchKey = `search-only:${searchTerm}`

                let searchResults = searchCache.get(searchKey)
                if (!searchResults) {
                    // Realizar búsqueda solo si no está en cache
                    searchResults = baseProducts.filter(product => {
                        const matchesName = product.name.toLowerCase().includes(searchTerm)
                        const matchesDescription = product.description.toLowerCase().includes(searchTerm)
                        const matchesBrand = product.brand?.toLowerCase().includes(searchTerm) || false
                        const matchesTags = product.tags?.some(tag =>
                            tag.toLowerCase().includes(searchTerm)
                        ) || false

                        return matchesName || matchesDescription || matchesBrand || matchesTags
                    })

                    // Cache del resultado de búsqueda
                    searchCache.set(searchKey, searchResults, 3 * 60 * 1000) // 3 minutos para búsquedas
                }

                filteredProducts = searchResults
            }

            // Guardar resultado final en cache
            searchCache.set(cacheKey, filteredProducts)
            setProducts(filteredProducts)

            return filteredProducts
        } catch (error) {
            setError(getErrorMessage(error))
            throw error
        } finally {
            setLoading(false)
        }
    }, [generateCacheKey, searchCache, productCache, getActiveProducts])



    const invalidateProduct = useCallback((productId: string) => {
        const cacheKey = `product-${productId}`
        productCache.remove(cacheKey)

        // También invalidar las listas que podrían contener este producto
        productCache.remove('all-active-products')
    }, [productCache])

    const getProductById = useCallback(async (productId: string, forceRefresh = false): Promise<ProductInterface> => {

        const cacheKey = `product-${productId}`

        const cachedProduct = productCache.get(cacheKey)

        if (cachedProduct && !forceRefresh) {
            console.log("Producto por id desde la cache")
            return cachedProduct[0]
        }


        setLoading(true);
        setError(null)
        try {

            const result = await db.getDocument(DB_ID, COLLECTIONS.PRODUCT, productId)
            const validation = ProductSchema.safeParse(result)
            if (validation.success) {
                const product = validation.data as ProductInterface;
                productCache.set(cacheKey, [product])
                return product;
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
    }, [productCache])


    //Limpiar cache cuando sea necesario
    const clearCache = useCallback(() => {
        productCache.clear()
        searchCache.clear()
        // Resetear las flags de datos cargados
        dataLoadedRef.current = {}
        console.log("Cache limpia")
    }, [productCache, searchCache])


    const getCacheStats = useCallback(() => {
        return {
            products: productCache.getStats(),
            search: searchCache.getStats()
        }
    }, [productCache, searchCache])

    return {
        products,
        loading,
        error,
        getActiveProducts,
        getProductById,
        getFilteredProducts,
        invalidateProduct,
        clearCache,
        getCacheStats
    }
}