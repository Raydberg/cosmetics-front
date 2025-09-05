import { Query } from "appwrite";
import type { ProductInterface } from "../interfaces/product.interface";
import { db, DB_ID } from "../lib/appwrite";
import { ProductSchema } from "../zod/product-shemas";
import { getErrorMessage } from "../utils/getErrorMessage";
import { COLLECTIONS } from "../config/collections";

interface FilterOptions {
    categoryIds?: string[];
    priceRanges?: string[];
    searchQuery?: string;
    priceSlider?: [number, number];
}

export class ProductService {

    static async getAllProducts(): Promise<ProductInterface[]> {
        try {
            const result = await db.listDocuments(DB_ID, COLLECTIONS.PRODUCT)

            return result.documents.map(doc => {
                const validation = ProductSchema.safeParse(doc)
                return validation.data as ProductInterface;
            })
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }

    static async getActiveProducts(): Promise<ProductInterface[]> {
        try {
            const result = await db.listDocuments(DB_ID, COLLECTIONS.PRODUCT, [
                Query.equal('isActive', true)
            ]);

            return result.documents.map(doc => {
                const validation = ProductSchema.safeParse(doc);
                return validation.data as ProductInterface;
            });
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }

    static async getProductById(productId: string): Promise<ProductInterface> {
        try {
            const result = await db.getDocument(DB_ID, COLLECTIONS.PRODUCT, productId);
            const validation = ProductSchema.safeParse(result);

            if (validation.success) {
                return validation.data as ProductInterface;
            } else {
                throw new Error("Datos de producto inválidos");
            }
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }

    static async getFilteredProducts(filters: FilterOptions): Promise<ProductInterface[]> {
        try {

            if (filters.categoryIds?.length) {
                const queries = [
                    Query.equal('isActive', true),
                    Query.equal('categoryId', filters.categoryIds)
                ];

                const result = await db.listDocuments(DB_ID, COLLECTIONS.PRODUCT, queries);
                return result.documents.map(doc => {
                    const validation = ProductSchema.safeParse(doc);
                    return validation.data as ProductInterface;
                });
            } else {
                return this.getActiveProducts();
            }
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }
    static async updateProduct(productId: string, productData: Partial<ProductInterface>): Promise<ProductInterface> {
        try {

            // Eliminar propiedades que no queremos actualizar
            const updateData = { ...productData };
            delete updateData.$id;
            delete updateData.$createdAt;
            delete updateData.$updatedAt;
            delete updateData.$collectionId;
            delete updateData.$databaseId;
            delete updateData.$permissions;

            // Realizar actualización en Appwrite
            const result = await db.updateDocument(
                DB_ID,
                COLLECTIONS.PRODUCT,
                productId,
                updateData
            );

            const validation = ProductSchema.safeParse(result);

            if (validation.success) {
                return validation.data as ProductInterface;
            } else {
                throw new Error("Datos actualizados inválidos");
            }
        } catch (error) {
            console.error("Error actualizando producto:", error);
            throw new Error(getErrorMessage(error));
        }
    }

}