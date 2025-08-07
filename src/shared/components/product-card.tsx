import { Tag } from "lucide-react";
import ImageViewer from "./image-viewer";
import PriceFormat_Sale from "./price-format-sale";
import { motion } from "framer-motion";
import { Link } from "react-router";
import type { ProductInterface } from "@/core/interfaces/product.interface";
import { cn } from "@/core/lib/utils";

export interface ProductCard {
    className?: string
    product: ProductInterface
}

export const ProductCard = ({ product, className }: ProductCard) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8 }}
            className={cn(
                "group relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-100/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-purple-900/20"
                , className
            )}
        >
            <Link to={`/products/${product.$id}`}>
                {product?.hasDiscount && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="absolute top-3 left-3 z-10"
                    >
                        <span className="relative inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-700 px-3 py-1.5 text-xs font-semibold text-white">
                            {product?.discountPercentage}% OFF
                            <motion.span
                                className="absolute -top-1 -right-1 flex h-3 w-3"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-purple-500"></span>
                            </motion.span>
                        </span>
                    </motion.div>
                )}


                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-100 p-6 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-violet-950/30">
                    <motion.div
                        className="absolute -bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 transform rounded-full bg-purple-500/20 blur-3xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <motion.div
                        className="transition-transform duration-500"
                        whileHover={{
                            scale: 1.05,
                            rotate: 2,
                            transition: { duration: 0.3 }
                        }}
                    >
                        {
                            product?.images ? (

                                <ImageViewer
                                    imageUrl={product?.images[0]}
                                    classNameThumbnailViewer="rounded-lg object-contain h-[180px] mx-auto drop-shadow-lg"
                                />
                            ) :
                                <ImageViewer
                                    imageUrl="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                                    classNameThumbnailViewer="rounded-lg object-contain h-[180px] mx-auto drop-shadow-lg"
                                />
                        }
                    </motion.div>


                </div>


                <motion.div
                    className="flex flex-1 flex-col gap-3 p-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <motion.div
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3 className="mb-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                            {product?.name}
                        </h3>
                    </motion.div>

                    <motion.p
                        className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                    >
                        {product?.description}
                    </motion.p>

                    <motion.div
                        className="mt-auto flex justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    >
                        {product?.hasDiscount ? (
                            <PriceFormat_Sale
                                prefix="S/."
                                originalPrice={product.originalPrice ?? 0}
                                salePrice={product.price}
                                showSavePercentage={false}
                                className="text-lg font-semibold text-gray-600 dark:text-gray-300"
                                classNameSalePrice="text-2xl font-bold text-purple-600 dark:text-purple-400"
                            />
                        ) :
                            (
                                <PriceFormat_Sale
                                    prefix="S/."
                                    originalPrice={product?.originalPrice ?? 0}
                                    showSavePercentage={false}
                                    className="text-lg font-semibold text-gray-600 dark:text-gray-300"
                                    classNameSalePrice="text-2xl font-bold text-purple-600 dark:text-purple-400"
                                />

                            )
                        }
                        {product?.hasDiscount && (
                            <motion.p
                                className="mt-1 inline-flex items-center text-sm text-green-600 dark:text-green-400"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Tag size={14} className="mr-1" />
                                {product.discountPercentage}%
                            </motion.p>
                        )}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 -skew-x-12 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{
                        x: "100%",
                        transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                />
            </Link>
        </motion.div>
    );
}