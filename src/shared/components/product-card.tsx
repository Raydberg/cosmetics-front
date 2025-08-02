import { Tag } from "lucide-react";
import ImageViewer from "./image-viewer";
import PriceFormat_Sale from "./price-format-sale";

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
}: ProductCard = {}) => {
    return (
        <div className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
         
            {organic && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="relative inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-700 px-3 py-1.5 text-xs font-semibold text-white">
                        15% OFF
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-purple-500"></span>
                        </span>
                    </span>
                </div>
            )}


            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-100 p-6 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-violet-950/30">
                <div className="absolute -bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 transform rounded-full bg-purple-500/20 blur-3xl"></div>
                <div className="transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                    <ImageViewer
                        imageUrl={imageUrl}
                        classNameThumbnailViewer="rounded-lg object-contain h-[180px] mx-auto drop-shadow-lg"
                    />
                </div>
            </div>

            {/* Product details */}
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                    <h3 className="mb-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                        {productName}
                    </h3>
                </div>

               
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>

                <div className="mt-auto">
                    <PriceFormat_Sale
                        prefix={currencyPrefix}
                        originalPrice={originalPrice}
                        salePrice={price}
                        showSavePercentage={false}
                        className="text-lg font-semibold text-gray-600 dark:text-gray-300"
                        classNameSalePrice="text-2xl font-bold text-purple-600 dark:text-purple-400"
                    />

                    <p className="mt-1 inline-flex items-center text-sm text-green-600 dark:text-green-400">
                        <Tag size={14} />
                        15%
                    </p>
                </div>
            </div>
        </div>
    );
}
