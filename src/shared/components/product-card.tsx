import { Tag } from "lucide-react";
import ImageViewer from "./image-viewer";
import PriceFormat_Sale from "./price-format-sale";
import { motion } from "framer-motion";
import { Link } from "react-router";

const DEFAULT_IMAGE_URL =
    "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/essential-oil-01.jpg";

export interface ProductCard {
    imageUrl?: string;
    organic?: boolean;
    productName?: string;
    description?: string;
    price?: number;
    originalPrice?: number;
    currencyPrefix?: string;
}

export const ProductCard = ({
    currencyPrefix = "$",
    description = "Fragancia exclusiva con notas florales y amaderadas",
    imageUrl = DEFAULT_IMAGE_URL,
    organic = true,
    originalPrice = 24.99,
    price = 18.99,
    productName = "Perfume Elegance",
}: ProductCard) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8 }}
            className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-100/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-purple-900/20"
        >
            <Link to={'/detail'}>
                {organic && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="absolute top-3 left-3 z-10"
                    >
                        <span className="relative inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-700 px-3 py-1.5 text-xs font-semibold text-white">
                            15% OFF
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
                        <ImageViewer
                            imageUrl={imageUrl}
                            classNameThumbnailViewer="rounded-lg object-contain h-[180px] mx-auto drop-shadow-lg"
                        />
                    </motion.div>


                </div>

                {/* Contenido del producto */}
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
                            {productName}
                        </h3>
                    </motion.div>

                    <motion.p
                        className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        className="mt-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    >
                        <PriceFormat_Sale
                            prefix={currencyPrefix}
                            originalPrice={originalPrice}
                            salePrice={price}
                            showSavePercentage={false}
                            className="text-lg font-semibold text-gray-600 dark:text-gray-300"
                            classNameSalePrice="text-2xl font-bold text-purple-600 dark:text-purple-400"
                        />

                        <motion.p
                            className="mt-1 inline-flex items-center text-sm text-green-600 dark:text-green-400"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Tag size={14} className="mr-1" />
                            15%
                        </motion.p>
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