import z from "zod";
import { CategorySchema } from "./category-shemas";

export const ProductSchema = z.object({
    $id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    originalPrice: z.number().optional().nullable(),
    discountPercentage: z.number().optional(),
    hasDiscount: z.boolean(),
    images: z.array(z.string()),
    categoryId: z.union([
        z.string(), CategorySchema
    ]),
    stock: z.number(),
    featured: z.boolean(),
    isActive: z.boolean(),
    tags: z.array(z.string()).optional(),
    brand: z.string().optional().nullable(),
    $createdAt: z.string().optional(),
    $updatedAt: z.string().optional(),
    $collectionId: z.string().optional(),
    $databaseId: z.string().optional(),
    $permissions: z.array(z.string()),
    $sequence: z.number(),
})