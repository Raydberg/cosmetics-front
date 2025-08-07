import {  useCallback, useEffect, useState, useRef, Fragment } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search, X } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFilters } from "@/core/hooks/useFilters"
import { useDebounce } from "@/core/hooks/useDebounce"

const formSchema = z.object({
    input: z.string().optional()
})

interface InputSearchProps {
    onSearch?: (query: string) => void
    className?: string
    enableRealTimeSearch?: boolean
    debounceDelay?: number
}

export const InputSearch = ({ 
    onSearch, 
    className = "w-full max-w-2xl mx-auto",
    enableRealTimeSearch = true,
    debounceDelay = 500
}: InputSearchProps) => {
    const { setSearchQuery, filters } = useFilters()
    const [isSearching, setIsSearching] = useState(false)
    const lastSearchRef = useRef<string>("")
    const isInitialRender = useRef(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: ""
        }
    })

    const searchValue = form.watch("input")

    // ✅ Función optimizada para realizar búsqueda
    const performSearch = useCallback((query: string) => {
        const trimmedQuery = query?.trim() || ""
        
        // ✅ Evitar búsquedas duplicadas
        if (trimmedQuery === lastSearchRef.current) {
            return
        }
        
        lastSearchRef.current = trimmedQuery
        
        console.log(`🔍 Performing search: "${trimmedQuery}"`)
        
        if (onSearch) {
            onSearch(trimmedQuery)
        }
        setSearchQuery(trimmedQuery)
    }, [onSearch, setSearchQuery])

    // ✅ Debounce optimizado
    const [debouncedSearch, cancelDebounce] = useDebounce(performSearch, debounceDelay)

    // ✅ Efecto para búsqueda en tiempo real
    useEffect(() => {
        // Evitar búsqueda en el primer render
        if (isInitialRender.current) {
            isInitialRender.current = false
            return
        }

        if (enableRealTimeSearch && searchValue !== undefined) {
            console.log(`⏰ Debouncing search: "${searchValue}"`)
            debouncedSearch(searchValue)
        }

        // Cleanup para cancelar búsquedas pendientes
        return () => {
            cancelDebounce()
        }
    }, [searchValue, debouncedSearch, enableRealTimeSearch, cancelDebounce])

    // ✅ Submit manual (Enter o botón)
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSearching(true)
        
        // Cancelar búsqueda debounced pendiente
        cancelDebounce()
        
        // Realizar búsqueda inmediata
        performSearch(values.input || "")
        
        setTimeout(() => setIsSearching(false), 300)
    }

    // ✅ Limpiar búsqueda
    const clearSearch = useCallback(() => {
        cancelDebounce()
        form.setValue("input", "")
        lastSearchRef.current = ""
        performSearch("")
    }, [form, performSearch, cancelDebounce])

    // ✅ Sincronizar con contexto global (solo cuando sea necesario)
    useEffect(() => {
        const currentInput = form.getValues("input") || ""
        if (filters.searchQuery !== currentInput && filters.searchQuery !== lastSearchRef.current) {
            form.setValue("input", filters.searchQuery)
            lastSearchRef.current = filters.searchQuery
        }
    }, [filters.searchQuery, form])

    return (
        <Fragment>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="default-search" className="sr-only">
                                    Buscar productos
                                </FormLabel>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        {isSearching ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                                        ) : (
                                            <Search size={20} className="text-gray-400 dark:text-gray-500" />
                                        )}
                                    </div>
                                    
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="search" 
                                            id="default-search" 
                                            autoComplete="off"
                                            className="
                                                block w-full pl-10 pr-20 py-3 text-sm 
                                                text-gray-900 dark:text-gray-100
                                                border border-gray-300 dark:border-gray-600
                                                rounded-lg bg-gray-50 dark:bg-gray-700
                                                focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                                                dark:focus:ring-purple-400 dark:focus:border-purple-400
                                                placeholder:text-gray-400 dark:placeholder:text-gray-500
                                                transition-colors duration-200
                                            "
                                            placeholder={enableRealTimeSearch ? "Buscar productos..." : "Buscar productos (presiona Enter)"}
                                        />
                                    </FormControl>
                                    
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        {searchValue && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={clearSearch}
                                                className="h-8 w-8 p-0 mr-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full transition-colors"
                                                aria-label="Limpiar búsqueda"
                                            >
                                                <X size={16} />
                                            </Button>
                                        )}
                                        
                                        <Button 
                                            type="submit"
                                            disabled={isSearching}
                                            className="
                                                h-8 px-3 mr-1
                                                bg-purple-600 hover:bg-purple-700
                                                dark:bg-purple-500 dark:hover:bg-purple-600
                                                text-white font-medium text-xs
                                                rounded-md transition-colors duration-200
                                                disabled:opacity-50 disabled:cursor-not-allowed
                                                focus:ring-2 focus:ring-purple-300 focus:ring-offset-1
                                            "
                                            aria-label="Buscar"
                                        >
                                            {isSearching ? (
                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                            ) : (
                                                <>
                                                    <Search size={14} className="sm:hidden" />
                                                    <span className="hidden sm:inline">Buscar</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* ✅ Indicador de estado de búsqueda */}
                                {/* {enableRealTimeSearch && searchValue && searchValue.length > 0 && (
                                    <div className="absolute top-full mt-1 left-0 right-0 z-10 pointer-events-none">
                                        <div className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                                            {isSearching ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-500"></div>
                                                    Buscando...
                                                </div>
                                            ) : (
                                                `Resultados para "${searchValue}"`
                                            )}
                                        </div>
                                    </div>
                                )} */}
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </Fragment>
    )
}