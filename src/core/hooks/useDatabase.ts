import { useState } from "react";
import { COLECCTION_ID, db, DB_ID } from "../lib/appwrite";
import type { CreateProduct } from "../interfaces/product.interface";

const data_example: CreateProduct[] = [
    {
        name: "Perfume Elegance",
        description: "Fragancia exclusiva con notas florales y amaderadas. Perfecta para ocasiones especiales.",
        price: 37.49,
        originalPrice: 49.99,
        discountPercentage: 25,
        hasDiscount: true,
        images: [
            "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/essential-oil-01.jpg",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
            "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"
        ],
        categoryId: "688ec2850036986cabbc",
        stock: 25,
        featured: true,
        isActive: true,
        brand: "Elegance Paris",
        tags: ["fragancia", "floral", "amaderado", "lujo"]
    },
    {
        name: "Crema Hidratante Premium",
        description: "Hidratación profunda para todo tipo de piel. Fórmula con ingredientes naturales y vitamina E.",
        price: 34.99,
        originalPrice: 34.99,
        discountPercentage: 0,
        hasDiscount: false,
        images: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"
        ],
        categoryId: "688ec2850036986cabbc",
        stock: 15,
        featured: false,
        isActive: true,
        brand: "SkinCare Pro",
        tags: ["hidratante", "natural", "vitamina-e"]
    },
    {
        name: "Set de Maquillaje Completo",
        description: "Kit completo con base, rubor, sombras y labial. Ideal para maquillaje profesional.",
        price: 89.99,
        originalPrice: 129.99,
        discountPercentage: 31,
        hasDiscount: true,
        images: [
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
        ],
        categoryId: "688ec2850036986cabbc",
        stock: 8,
        featured: true,
        isActive: true,
        brand: "MakeUp Pro",
        tags: ["maquillaje", "profesional", "kit", "completo"]
    }
]

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