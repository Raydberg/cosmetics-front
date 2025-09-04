import { COLLECTIONS } from "../config/collections";
import { db, DB_ID, Query } from "../lib/appwrite";
import { CategorySchema } from "../zod/category-shemas";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { CategoryInterface } from "../interfaces/category.interface";

export class CategoryService {


    static async getAllCategories() {
        try {
            console.log("Trayendo las categorias de la API")
            const result = await db.listDocuments(DB_ID, COLLECTIONS.CATEGORY);
            return result.documents.map(doc => {
                const validation = CategorySchema.safeParse(doc);
                return validation.data as CategoryService;
            })
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }

    static async getActiveCategories() {
        try {
            const result = await db.listDocuments(DB_ID, COLLECTIONS.CATEGORY, [
                Query.equal('isActive', true)
            ]);

            return result.documents.map(doc => {
                const validation = CategorySchema.safeParse(doc);
                return validation.data as CategoryInterface;
            });
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }


    static async getCategoryId(categoryId: string) {
        try {
            console.log(`🌐 Fetching category from API: ${categoryId}`);
            const result = await db.getDocument(DB_ID, COLLECTIONS.CATEGORY, categoryId);

            const validation = CategorySchema.safeParse(result);
            return validation.data as CategoryInterface;
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }


}