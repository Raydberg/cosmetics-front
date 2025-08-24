import type { FieldArrayItem } from "@/modules/admin/products/components/summary-section";
import z from "zod";

export const productAdminSchema = z.object({
  // id$:z.string().optional(),
  name: z.string().min(1, 'El nombre es requerido').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(10, 'Mínimo 10 caracteres').max(500, 'Máximo 500 caracteres'),
  price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  originalPrice: z.number().optional().nullable(),
  discountPercentage: z.number().min(0).max(100).optional(),
  hasDiscount: z.boolean().optional(),
  images: z.array(z.string()).nonempty('Mínimo 1 imagen requerida'),
  categoryId: z.string().min(1, 'Categoría requerida'),
  stock: z.number().int().min(0, 'Stock debe ser mayor o igual a 0'),
  featured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  brand: z.string().optional().nullable(),
  tags: z.array(z.string()).optional()
});

export type ProductFormData = z.infer<typeof productAdminSchema>

export type ProductFormFields = Omit<ProductFormData, 'images' | 'tags'> & {
  images: FieldArrayItem[];
  tags?: FieldArrayItem[];
};