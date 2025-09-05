import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useCategory } from "@/core/hooks/useCategory";

import { Slider } from "./ui/slider";
import { useProduct } from "@/modules/client/hooks/useProduct";

export const FilterContent = () => {
    const [openSections, setOpenSections] = useState({
        categories: true,
        price: true,
        priceSlider: true
    })
    const [localSliderValue, setLocalSliderValue] = useState<[number, number]>([0, 100])

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const { categoryActiveQuery, selectedCategory } = useCategory()

    const { filters, filterActions } = useProduct()



    const handleSliderCommit = (value: number[]) => {
        filterActions.setPriceSlider(value as [number, number])
    }

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
                        {filterActions.toggleCategory.length > 0 && (
                            <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
                                {filterActions.toggleCategory.length}
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
                                {categoryActiveQuery.data?.map((category, index) => {

                                    const isSelected = Array.isArray(selectedCategory)
                                        ? selectedCategory.includes(category.$id ?? '')
                                        : selectedCategory ? (selectedCategory.$id === category.$id) : false;

                                    return (
                                        <motion.div
                                            key={category.$id}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isSelected
                                                ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            <Checkbox
                                                id={category.$id}
                                                checked={Boolean(isSelected)}
                                                onCheckedChange={() => filterActions.toggleCategory(category.$id!)}
                                            />
                                            <Label
                                                htmlFor={category.$id}
                                                className={`text-sm font-normal cursor-pointer flex-1 transition-colors ${isSelected
                                                    ? 'text-purple-700 dark:text-purple-300 font-medium'
                                                    : 'hover:text-gray-900 dark:hover:text-gray-100'
                                                    }`}
                                            >
                                                {category.name}
                                            </Label>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div>
                <motion.button
                    onClick={() => toggleSection('priceSlider')}
                    className="flex items-center justify-between w-full text-left mb-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Rango de Precio
                        {(filters.priceSlider[0] > 0 || filters.priceSlider[1] < 800) && (
                            <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
                                S/.{filters.priceSlider[0]} - S/.{filters.priceSlider[1]}
                            </span>
                        )}
                    </h4>
                    <motion.div
                        animate={{ rotate: openSections.priceSlider ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown size={16} />
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {openSections.priceSlider && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-4 pl-2 pr-2">
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                    <span>S/.{localSliderValue[0]}</span>
                                    <span>S/.{localSliderValue[1]}</span>
                                </div>

                                <Slider
                                    value={localSliderValue}
                                    onValueChange={(value) => setLocalSliderValue(value as [number, number])}
                                    onValueCommit={handleSliderCommit}
                                    max={800}
                                    min={0}
                                    step={1}
                                    className="w-full"
                                />

                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                                    <span>S/.0</span>
                                    <span>S/.800</span>
                                </div>
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
                        Rangos Rápidos
                        {filters.priceRanges.length > 0 && (
                            <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
                                {filters.priceRanges.length}
                            </span>
                        )}
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
                                    { id: "price1", label: "Menos de S/.20" },
                                    { id: "price2", label: "S/.20 - S/.50" },
                                    { id: "price3", label: "Más de S/.50" }
                                ].map((item, index) => {
                                    const isSelected = filters.priceRanges.includes(item.id)
                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isSelected
                                                ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            <Checkbox
                                                id={item.id}
                                                checked={isSelected}
                                                onCheckedChange={() => filterActions.togglePriceRange(item.id)}
                                            />
                                            <Label
                                                htmlFor={item.id}
                                                className={`text-sm font-normal cursor-pointer flex-1 transition-colors ${isSelected
                                                    ? 'text-purple-700 dark:text-purple-300 font-medium'
                                                    : 'hover:text-gray-900 dark:hover:text-gray-100'
                                                    }`}
                                            >
                                                {item.label}
                                            </Label>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}