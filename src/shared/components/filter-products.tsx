import { Button } from "./ui/button"
import { Filter, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FilterContent } from "./filter-content"

export const FilterProducts = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="md:hidden fixed top-20 right-4 z-50">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="default"
                        size="lg"
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Filter size={20} />
                        </motion.div>
                    </Button>
                </motion.div>
            </div>

            <div className="hidden md:block w-64 lg:w-72">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto shadow-sm"
                >
                    <FilterContent />
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300
                            }}
                            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden"
                        >
                            <div className="flex justify-center py-3">
                                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                            </div>

                            <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    Filtros
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full"
                                >
                                    <X size={20} />
                                </Button>
                            </div>

                            <div className="overflow-y-auto max-h-[calc(85vh-8rem)] px-6 py-4">
                                <FilterContent />
                            </div>

                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                            >
                                <div className="flex gap-3">
                                    <Button
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Aplicar Filtros
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Limpiar
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

