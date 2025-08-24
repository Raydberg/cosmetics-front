import { useState, useCallback } from "react"
import { useProduct } from "../useProduct"
import { db, DB_ID } from "@/core/lib/appwrite"
import { COLLECTIONS } from "@/core/config/collections"
import type { ProductInterface } from "@/core/interfaces/product.interface"
import type { ProductFormData } from "@/core/zod/admin/production-validation"
import { getErrorMessage } from "@/core/utils/getErrorMessage"

export const useProductAdmin = () => {
  // Reutilizar el hook base
  const productHook = useProduct()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [adminError, setAdminError] = useState<string | null>(null)

  // Crear producto
  const createProduct = useCallback(async (data: ProductFormData): Promise<ProductInterface | null> => {
    setIsSubmitting(true)
    setAdminError(null)

    try {
      const result = await db.createDocument(
        DB_ID,
        COLLECTIONS.PRODUCT,
        'unique()',
        data
      )

      // Invalidar cache para asegurar datos frescos
      productHook.clearCache()

      // Recargar productos activos con force refresh
      await productHook.getActiveProducts(true)

      return result as unknown as ProductInterface
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      setAdminError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [productHook])

  // Actualizar producto
  const updateProduct = useCallback(async (id: string, data: Partial<ProductFormData>): Promise<ProductInterface | null> => {
    setIsSubmitting(true)
    setAdminError(null)

    try {
      // Transformación para tags si es necesaria
      const transformedData = {
        ...data,
        tags: Array.isArray(data.tags)
          ? data.tags.map(tag => typeof tag === 'string' ? tag : tag.value)
          : data.tags
      }

      const result = await db.updateDocument(
        DB_ID,
        COLLECTIONS.PRODUCT,
        id,
        transformedData
      )

      // Invalidar específicamente este producto
      productHook.invalidateProduct(id)

      // Recargar productos activos con force refresh
      await productHook.getActiveProducts(true)

      return result as unknown as ProductInterface
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      setAdminError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [productHook])

  // Eliminar producto
  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setIsSubmitting(true)
    setAdminError(null)

    try {
      await db.deleteDocument(
        DB_ID,
        COLLECTIONS.PRODUCT,
        id
      )

      // Invalidar específicamente este producto
      productHook.invalidateProduct(id)

      // Recargar productos activos con force refresh
      await productHook.getActiveProducts(true)

      return true
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      setAdminError(errorMessage)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [productHook])

  return {
    ...productHook,
    createProduct,
    updateProduct,
    deleteProduct,
    isSubmitting,
    adminError
  }
}