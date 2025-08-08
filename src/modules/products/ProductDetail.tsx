import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/shared/components/ui/badge';

import {
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import PriceFormat_Sale from '@/shared/components/price-format-sale';
import type { ProductInterface } from '@/core/interfaces/product.interface';


interface ProductDetailProps {
  product?: ProductInterface
}
export default function ProductDetailModal({ product }: ProductDetailProps) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const prevImage = () => setCurrentImageIndex(i => i === 0 ? product!.images.length - 1 : i - 1);
  const nextImage = () => setCurrentImageIndex(i => i === product!.images.length - 1 ? 0 : i + 1);


  return (

    <div className="bg-white border dark:bg-gray-900 rounded-lg w-full overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-row md:flex-col justify-start md:justify-center items-center space-x-2 md:space-x-0 md:space-y-6 p-5 bg-gray-100 dark:bg-gray-800">
          {product!.images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={` cursor-pointer w-14 h-14 md:w-30 md:h-30  border-2 rounded-lg overflow-hidden transition ${currentImageIndex === idx ? 'border-purple-500' : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <div className="relative flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          {product!.hasDiscount && (
            <motion.div
              className="absolute top-2 left-2 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <Badge variant="destructive" className="text-xs sm:text-sm font-bold">
                {product!.discountPercentage}% OFF
              </Badge>
            </motion.div>
          )}

          <div className="relative aspect-square">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={product!.images[currentImageIndex]}
                alt="product"
                className="w-full h-full object-contain rounded-4xl p-2 md:p-4 "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            <button
              onClick={prevImage}
              className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition hidden md:block"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition hidden md:block"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* DETALLE */}
      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <Badge variant="outline" className="mb-1 text-xs sm:text-sm">{product!.brand}</Badge>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {product!.name}
            </h2>
          </div>

        </div>

        <div className="flex items-baseline gap-2 mt-2">
          {/* <span className="text-xl sm:text-2xl font-bold text-purple-600">
            ${product.price}
          </span>
          <span className="text-sm sm:text-base text-gray-500 line-through">
            ${product.originalPrice}
          </span> */}

          {product!.hasDiscount ? (
            <PriceFormat_Sale
              prefix="S/."
              originalPrice={product!.originalPrice ?? 0}
              salePrice={product!.price}
              showSavePercentage={false}
              className="text-lg font-semibold text-gray-600 dark:text-gray-300"
              classNameSalePrice="text-2xl font-bold text-purple-600 dark:text-purple-400"
            />
          ) :
            (
              <PriceFormat_Sale
                prefix="S/."
                originalPrice={product!.originalPrice ?? 0}
                showSavePercentage={false}
                className="text-lg font-semibold text-gray-600 dark:text-gray-300"
                classNameSalePrice="text-2xl font-bold text-purple-600 dark:text-purple-400"
              />
            )}
        </div>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 flex-1">
          {product!.description}
        </p>

        <div className="flex flex-wrap gap-1 mt-3">
          {product!.tags?.map((t, i) => (
            <Badge key={i} variant="secondary" className="text-xs sm:text-sm">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
