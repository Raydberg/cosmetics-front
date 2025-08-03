import { useState } from "react";
import { COLECCTION_ID, db, DB_ID } from "../lib/appwrite";
import { data_example } from "../api/data-example";


export const useDatabase = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const verifySetup = async () => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            console.log('🔍 Verificando configuración...')
            const result = await db.listDocuments(DB_ID, COLECCTION_ID)
            console.log('✅ Colección productos encontrada. Documentos existentes:', result.total)
            setSuccess(`✅ Configuración correcta. Colección productos existe con ${result.total} documentos.`)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
            console.error('❌ Error en verificación:', error)
        } finally {
            setLoading(false)
        }
    }

    const seedDatabase = async () => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            console.log("🌱 Iniciando seeding de productos...")

            const results = []
            for (const data of data_example) {
                console.log(`📝 Creando producto: ${data.name}`)
                console.log(`💰 Precio: $${data.price} ${data.hasDiscount ? `(${data.discountPercentage}% OFF)` : ''}`)

                const result = await db.createDocument(DB_ID, COLECCTION_ID, 'unique()', data)
                results.push(result)
                console.log(`✅ Producto creado: ${data.name} (ID: ${result.$id})`)
            }

            setSuccess(`🎉 ${results.length} productos creados exitosamente!`)

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
            console.error("❌ Error durante el seeding:", error)
        } finally {
            setLoading(false)
        }
    }

    const getProductsWithCategories = async () => {
        try {
            const result = await db.listDocuments(DB_ID, COLECCTION_ID)
            console.log('📦 Productos obtenidos:', result.documents)
            return result.documents
        } catch (error) {
            console.error('❌ Error obteniendo productos:', error)
            throw error
        }
    }

    return {
        seedDatabase,
        verifySetup,
        getProductsWithCategories,
        loading,
        error,
        success
    }
}