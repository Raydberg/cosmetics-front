import type { CreateProduct } from "../interfaces/product.interface"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]


export const data_example: CreateProduct[] = [
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