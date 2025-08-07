import { useEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useCategory } from "@/core/hooks/useCategory";
import { useFilters } from "@/core/hooks/useFilters";

export const FilterContent = () => {


    const [openSections, setOpenSections] = useState({
        categories: true,
        price: true
    })

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }
    const { getActiveCategories, categories } = useCategory()
    const { filters, toggleCategory, togglePriceRange } = useFilters()
    useEffect(() => {
        getActiveCategories()
    }, [])



    return (
        <div className="space-y-6">
            <div>
                <motion.button
                    onClick={() => toggleSection('categories')}
                    className="flex items-center justify-between w-full text-left mb-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Categorías
                        {filters.selectCategories.length > 0 && (
                            <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                {filters.selectCategories.length}
                            </span>
                        )}
                    </h4>
                    <motion.div
                        animate={{ rotate: openSections.categories ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown size={16} />
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {openSections.categories && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-3 pl-2">
                                {categories.map((category, index) => (
                                    <motion.div
                                        key={category.$id}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <Checkbox
                                            id={category.$id}
                                            checked={filters.selectCategories.includes(category.$id!)}
                                            onCheckedChange={() => toggleCategory(category.$id!)}
                                        />
                                        <Label
                                            htmlFor={category.$id}
                                            className="text-sm font-normal cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 flex-1"
                                        >
                                            {category.name}
                                        </Label>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div>
                <motion.button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full text-left mb-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Rango de Precio
                    </h4>
                    <motion.div
                        animate={{ rotate: openSections.price ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown size={16} />
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {openSections.price && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-3 pl-2">
                                {[
                                    { id: "price1", label: "Menos de $20" },
                                    { id: "price2", label: "$20 - $50" },
                                    { id: "price3", label: "Más de $50" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <Checkbox id={item.id}
                                            checked={filters.priceRange.includes(item.id)}
                                            onCheckedChange={() => togglePriceRange(item.id)}
                                        />
                                        <Label
                                            htmlFor={item.id}
                                            className="text-sm font-normal cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 flex-1"
                                        >
                                            {item.label}
                                        </Label>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}