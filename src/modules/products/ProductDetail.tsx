import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import {
  Heart,
  Star,
  StarHalf,
  Minus,
  Plus,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';


const mockProduct = {
  name: 'Perfume Elegance Premium',
  brand: 'LuxuryScents',
  price: 299.99,
  originalPrice: 399.99,
  discountPercentage: 25,
  rating: 4.5,
  reviewCount: 234,
  stock: 15,
  description: 'Un perfume sofisticado y elegante que combina notas florales y frutales con un toque de almizcle. Perfecto para ocasiones especiales y uso diario. Larga duración y proyección excepcional.',
  images: [
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop'
  ],
  colors: ['Rosa', 'Dorado', 'Transparente'],
  sizes: ['30ml', '50ml', '100ml'],
  tags: ['Perfume', 'Lujo', 'Floral', 'Larga Duración', 'Unisex']
};

export default function ProductDetailModal({ onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const prevImage = () => setCurrentImageIndex(i => i === 0 ? mockProduct.images.length - 1 : i - 1);
  const nextImage = () => setCurrentImageIndex(i => i === mockProduct.images.length - 1 ? 0 : i + 1);
  const changeQty = dir => setQuantity(q => dir === 'inc' ? Math.min(q + 1, mockProduct.stock) : Math.max(q - 1, 1));
  const renderStars = rating => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < full; i++) stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
    if (half) stars.push(<StarHalf key="half" className="w-4 h-4 text-yellow-400" />);
    for (let i = 0; i < 5 - full - (half ? 1 : 0); i++) stars.push(<Star key={`e${i}`} className="w-4 h-4 text-gray-300" />);
    return stars;
  };

  return (
    <div className="">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg md:max-w-4xl mx-auto overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* GALERÍA */}
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row md:flex-col justify-start md:justify-center items-center space-x-2 md:space-x-0 md:space-y-2 p-2 bg-gray-100 dark:bg-gray-800">
            {mockProduct.images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-14 h-14 md:w-16 md:h-16 border-2 rounded-lg overflow-hidden transition ${
                  currentImageIndex === idx ? 'border-purple-500' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            {mockProduct.discountPercentage && (
              <motion.div
                className="absolute top-2 left-2 z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <Badge variant="destructive" className="text-xs sm:text-sm font-bold">
                  {mockProduct.discountPercentage}% OFF
                </Badge>
              </motion.div>
            )}
            <button
              onClick={() => setIsWishlisted(w => !w)}
              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition z-10"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500' : 'text-gray-600'}`} />
            </button>
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={mockProduct.images[currentImageIndex]}
                  alt="product"
                  className="w-full h-full object-contain p-2 md:p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition hidden md:block"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition hidden md:block"
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
              <Badge variant="outline" className="mb-1 text-xs sm:text-sm">{mockProduct.brand}</Badge>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mockProduct.name}
              </h2>
            </div>
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 mt-2">
            <div className="flex">{renderStars(mockProduct.rating)}</div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {mockProduct.rating} ({mockProduct.reviewCount})
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-xl sm:text-2xl font-bold text-purple-600">
              ${mockProduct.price}
            </span>
            <span className="text-sm sm:text-base text-gray-500 line-through">
              ${mockProduct.originalPrice}
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 flex-1">
            {mockProduct.description}
          </p>

          <Separator className="my-3" />

          <div className="space-y-3">
            {/* Color */}
            <div>
              <h4 className="text-sm font-semibold mb-1">Color:</h4>
              <div className="flex gap-2 flex-wrap">
                {mockProduct.colors.map((c, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={selectedColor === i ? 'outline' : 'ghost'}
                    onClick={() => setSelectedColor(i)}
                    className={
                      selectedColor === i ? 'border-purple-500 text-purple-700' : ''
                    }
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tamaño */}
            <div>
              <h4 className="text-sm font-semibold mb-1">Tamaño:</h4>
              <div className="flex gap-2 flex-wrap">
                {mockProduct.sizes.map((s, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={selectedSize === i ? 'outline' : 'ghost'}
                    onClick={() => setSelectedSize(i)}
                    className={
                      selectedSize === i ? 'border-purple-500 text-purple-700' : ''
                    }
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <h4 className="text-sm font-semibold mb-1">Cantidad:</h4>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => changeQty('dec')} disabled={quantity === 1}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-2 text-sm">{quantity}</span>
                <Button size="sm" variant="ghost" onClick={() => changeQty('inc')} disabled={quantity === mockProduct.stock}>
                  <Plus className="w-4 h-4" />
                </Button>
                <span className="text-xs text-gray-500">({mockProduct.stock} disp.)</span>
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1 text-sm sm:text-base" size="lg">
              <ShoppingCart className="w-4 h-4 mr-1" /> Agregar al carrito
            </Button>
            <Button variant="outline" className="flex-1 text-sm sm:text-base" size="lg">
              Comprar ahora
            </Button>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {mockProduct.tags.map((t, i) => (
              <Badge key={i} variant="secondary" className="text-xs sm:text-sm">
                {t}
              </Badge>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
