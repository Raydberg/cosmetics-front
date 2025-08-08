import { useCallback, useState } from "react"
import type { CategoryInterface } from "../interfaces/category.interface"
import { db, DB_ID } from "../lib/appwrite"
import { COLLECTIONS } from "../config/collections"
import { Query } from "appwrite"
import { CategorySchema } from "../zod/category-shemas"
import { getErrorMessage } from "../utils/getErrorMessage"
import { useCache } from "./useCache"

export const useCategory = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const [error, setError] = useState<string | null>(null)
    const [categories, setCategories] = useState<CategoryInterface[]>([])
    const categoryCache = useCache<CategoryInterface[]>({
        defaultTTL: 30 * 60 * 1000, // 30 minutos
        maxSize: 10
    })

    const getCategories = useCallback(async (): Promise<CategoryInterface[]> => {
        const cacheKey = 'all-categories'

        // Verificar cache primero
        const cachedData = categoryCache.get(cacheKey)
        if (cachedData) {
            console.log('traer categorias de cache')
            setCategories(cachedData)
            return cachedData
        }

        setLoading(true)
        setError(null)

        try {
            console.log('🌐 Fetching categories from API')
            const result = await db.listDocuments(DB_ID, COLLECTIONS.CATEGORY)
            const categoryData = result.documents.map(doc => {
                const validation = CategorySchema.safeParse(doc)
                return validation.data as CategoryInterface
            })

            // Guardar en cache
            categoryCache.set(cacheKey, categoryData)
            setCategories(categoryData)

            return categoryData
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido"
            setError(errorMessage)
            throw error
        } finally {
            setLoading(false)
        }
    }, [categoryCache])

    const getCategoryById = useCallback(async (categoryId: CategoryInterface['$id']): Promise<CategoryInterface | undefined> => {
        const cacheKey = `category-${categoryId}`

        // Verificar cache primero
        const cachedCategory = categoryCache.get(cacheKey)
        if (cachedCategory && cachedCategory[0]) {
            console.log(`traer categoria de cache: ${categoryId}`)
            return cachedCategory[0]
        }

        setLoading(true)
        setError(null)

        try {
            console.log(`🌐 Fetching category from API: ${categoryId}`)
            const result = await db.getDocument(DB_ID, COLLECTIONS.CATEGORY, categoryId ?? '')
            const validation = CategorySchema.safeParse(result)

            if (validation.success) {
                const category = validation.data as CategoryInterface
                // Guardar en cache
                categoryCache.set(cacheKey, [category])
                return category
            } else {
                throw new Error("Datos de categoría inválidos")
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
            console.error("Error obteniendo categoría:", error)
        } finally {
            setLoading(false)
        }
    }, [categoryCache])

    const getActiveCategories = useCallback(async (): Promise<CategoryInterface[]> => {
        const cacheKey = 'active-categories'

        // Verificar cache primero
        const cachedData = categoryCache.get(cacheKey)
        if (cachedData) {
            console.log('categorias activas desde la cache')
            setCategories(cachedData)
            return cachedData
        }

        setLoading(true)
        setError(null)

        try {
            const result = await db.listDocuments(DB_ID, COLLECTIONS.CATEGORY, [
                Query.equal('isActive', true)
            ])

            const activeCategoriesData = result.documents.map(doc => {
                const validation = CategorySchema.safeParse(doc)
                return validation.data as CategoryInterface
            })

            // Guardar en cache
            categoryCache.set(cacheKey, activeCategoriesData)
            setCategories(activeCategoriesData)

            return activeCategoriesData
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            setError(errorMessage)
            throw error
        } finally {
            setLoading(false)
        }
    }, [categoryCache])
    const clearCache = useCallback(() => {
        categoryCache.clear()
        console.log('🧹 Categories cache cleared')
    }, [categoryCache])

    
    return {
        categories,
        loading,
        error,
        getCategories,
        getCategoryById,
        getActiveCategories,
        clearCache
    }
}