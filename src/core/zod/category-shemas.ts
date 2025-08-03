import z from "zod";

export const CategorySchema = z.object({
    $id: z.string().optional(),
    $collectionId: z.string(),
    $databaseId: z.string(),
    $createdAt: z.string(),
    $updatedAt: z.string(),
    $permissions: z.array(z.string()),
    $sequence: z.number(),
    name: z.string(),
    slug: z.string(),
    isActive: z.boolean(),
    image: z.string().nullable(), 
})


// export const CategorySchema = z.object({
//     name: z.string(),
//     slug: z.string(),
//     isActive: z.boolean(),
//     image: z.string().nullable(),
//     description: z.string().optional(),
// }).passthrough() // ✅ Esta es la clave