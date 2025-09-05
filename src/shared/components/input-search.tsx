import { useCallback, useEffect, useState, useRef, Fragment } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search, X } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useDebounce } from "@/core/hooks/useDebounce"
import { useProduct } from "@/modules/client/hooks/useProduct"

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
    const { filterActions, filters } = useProduct({})
    
    const [isSearching, setIsSearching] = useState(false)
    const lastSearchRef = useRef<string>("")
    const isInitialRender = useRef(true)
    const searchHistoryRef = useRef<Set<string>>(new Set())

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: filters.searchQuery || ''
        }
    })

    const searchValue = form.watch("input")

    const performSearch = useCallback((query: string) => {
        const trimmedQuery = query?.trim() || ""

        if (trimmedQuery === lastSearchRef.current) {
            console.log(`⏭️ Skipping duplicate search: "${trimmedQuery}"`)
            return
        }

        if (trimmedQuery && searchHistoryRef.current.has(trimmedQuery.toLowerCase())) {
            console.log(`📋 Using search from recent history: "${trimmedQuery}"`)
        } else if (trimmedQuery) {
            if (searchHistoryRef.current.size >= 50) {
                const firstItem = searchHistoryRef.current.values().next().value
                if (typeof firstItem === "string") {
                    searchHistoryRef.current.delete(firstItem)
                }
            }
            searchHistoryRef.current.add(trimmedQuery.toLowerCase())
        }

        lastSearchRef.current = trimmedQuery

        if (onSearch) {
            onSearch(trimmedQuery)
        }
        // FIX: Use filterActions.setSearchQuery instead of setSearchQuery
        filterActions.setSearchQuery(trimmedQuery)
    }, [onSearch, filterActions])

    const [debouncedSearch, cancelDebounce] = useDebounce(performSearch, debounceDelay)

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false
            return
        }

        if (enableRealTimeSearch && searchValue !== undefined) {
            const trimmedValue = searchValue?.trim() || ""
            if (trimmedValue !== lastSearchRef.current) {
                debouncedSearch(searchValue)
            }
        }

        return () => {
            cancelDebounce()
        }
    }, [searchValue, debouncedSearch, enableRealTimeSearch, cancelDebounce])


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSearching(true)
        cancelDebounce()
        performSearch(values.input || "")
        setTimeout(() => setIsSearching(false), 300)
    }

    const clearSearch = useCallback(() => {
        cancelDebounce()
        form.setValue("input", "")
        lastSearchRef.current = ""
        performSearch("")
    }, [form, performSearch, cancelDebounce])


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
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </Fragment>
    );
}