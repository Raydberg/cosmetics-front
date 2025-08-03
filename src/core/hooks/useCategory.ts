import { useState } from "react"
import type { CategoryInterface } from "../interfaces/category.interface"
import { db, DB_ID } from "../lib/appwrite"
import { COLLECTIONS } from "../config/collections"
import { Query } from "appwrite"
import { CategorySchema } from "../zod/category-shemas"

export const useCategory = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const [error, setError] = useState<string | null>(null)
    const [categories, setCategories] = useState<CategoryInterface[]>([])

    const getCategories = async (): Promise<CategoryInterface[]> => {
        setLoading(true)
        setError(null)

        try {
            const result = await db.listDocuments(DB_ID, COLLECTIONS.CATEGORY)
            const categoryData = result.documents.map(doc => {
                const validation = CategorySchema.safeParse(doc)
                return validation.data as CategoryInterface
            })
            setCategories(categoryData)
            console.table(categoryData)
            return categoryData;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido"
            setError(errorMessage)
            throw error;
        } finally {
            setLoading(false)
        }
    }

    const getCategoryById = async (categoryId: CategoryInterface['$id']): Promise<CategoryInterface | undefined> => {
        setLoading(true)
        setError(null)
        try {
            const result = await db.getDocument(DB_ID, COLLECTIONS.CATEGORY, categoryId ?? '')
            const validation = CategorySchema.safeParse(result)

            if (validation.success) {
                return validation.data as CategoryInterface
            } else {
                throw new Error("Datos de categori invalidos")
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
            console.error("Error obtenido", error)
        } finally {
            setLoading(false)
        }
    }

    const getActiveCategories = async () => {
        setLoading(true)
        setError(null)

        try {
            const result = await db.listDocuments(DB_ID, COLLECTIONS.CATEGORY, [
                Query.equal('isActive', true)
            ])
            console.log("Datow de appwrite ", result.documents)
            const activeCategoriesData = result.documents.map(doc => {
                const validation = CategorySchema.safeParse(doc)
                return validation.data as CategoryInterface
            })

            setCategories(activeCategoriesData)
            console.log(activeCategoriesData)
            return activeCategoriesData

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'

            setError(errorMessage)
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return {
        categories, loading, error,
        getCategories, getCategoryById, getActiveCategories
    }
}