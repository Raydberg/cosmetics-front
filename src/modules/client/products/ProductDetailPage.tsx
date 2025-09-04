import { useProduct } from "@/modules/client/hooks/useProduct";
import type { ProductInterface } from "@/core/interfaces/product.interface";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { motion } from 'framer-motion';
import { ArrowLeft } from "lucide-react";

export const ProductDetailPage = () => {

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
    const { getProductById } = useProduct()
    const [product, setProduct] = useState<ProductInterface | null>(null)


    const fetchProduct = useMemo(() => {
        if (!id) return null;
        return async () => {
            try {
                const productData = await getProductById(id);
                if (productData) { setProduct(productData) }
            } catch (error) {
                console.error("Error fetching product", error)
            }
        }
    }, [id, getProductById])
    // fet<chProduct()
    useEffect(() => {
        if (fetchProduct) {
            fetchProduct()
        }
    }, [fetchProduct])


    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Button
                    variant="outline"
                    onClick={() => navigate('/products')}
                    className="mb-6 cursor-pointer"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a productos
                </Button>

                {/* <ProductDetailModal product={product} /> */}
            </motion.div>
        </div>
    )
}
