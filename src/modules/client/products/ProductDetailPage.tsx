import { useProduct } from "@/modules/client/hooks/useProduct";
import { Button } from "@/shared/components/ui/button";
import { useNavigate, useParams } from "react-router"
import { motion } from 'framer-motion';
import { ArrowLeft } from "lucide-react";
import ProductDetailModal from "./ProductDetail";

export const ProductDetailPage = () => {

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
    const { productDetailsQuery } = useProduct({
        productId: id
    })


    if (productDetailsQuery.isLoading) {
        return <div>Cargando producto</div>
    }

    if (productDetailsQuery.error) {
        return <div>Error al cargar el producto {productDetailsQuery.error.message}</div>
    }



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

                <ProductDetailModal product={productDetailsQuery.data} />
            </motion.div>
        </div>
    )
}
