import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

const slides = [
    {
        id: 1,
        title: "Productos de Belleza Premium",
        subtitle: "Descubre nuestra colección exclusiva",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop",
        gradient: "from-purple-600/80 to-pink-600/80"
    },
    {
        id: 2,
        title: "Cuidado Personal de Lujo",
        subtitle: "Para tu bienestar y confianza",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=400&fit=crop",
        gradient: "from-blue-600/80 to-teal-600/80"
    },
    {
        id: 3,
        title: "Ofertas Especiales",
        subtitle: "Hasta 50% de descuento en productos seleccionados",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop",
        gradient: "from-orange-600/80 to-red-600/80"
    }
]

export const CustomCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 4000) // Cambia cada 4 segundos

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    return (
        <div 
            className="relative w-full h-80 lg:h-96 overflow-hidden bg-gray-900"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    {/* Imagen de fondo */}
                    <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Overlay con gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient}`} />
                    
                    {/* Contenido */}
                    <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
                        <div className="max-w-4xl">
                            <motion.h1
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-3xl sm:text-5xl font-bold mb-4"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>
                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-lg sm:text-xl mb-8 text-gray-100"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                                    Ver Productos
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Botones de navegación */}
            <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            >
                <ChevronLeft size={20} />
                <span className="sr-only">Anterior</span>
            </Button>

            <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            >
                <ChevronRight size={20} />
                <span className="sr-only">Siguiente</span>
            </Button>

            {/* Indicadores de puntos */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? 'bg-white scale-110'
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Ir al slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Indicador de progreso */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                <motion.div
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    key={currentSlide}
                    transition={{ duration: 4, ease: "linear" }}
                />
            </div>
        </div>
    )
}