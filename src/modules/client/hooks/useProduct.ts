import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { ProductService } from "@/core/services/product.service";
import { useHasActiveFilters, useProductStore } from "@/core/store/useProductStore";
// import type { ProductInterface } from "@/core/interfaces/product.interface";


interface Props {
    productId?: string
}


const QUERY_KEYS = {
    allProducts: ['products'],
    activeProducts: ['products', 'active'],
    filteredProducts: ['products', 'filtered'],
    product: (id: string) => ['products', id],
};

export const useProduct = ({ productId }: Props = {}) => {

    const categoryIds = useProductStore(state => state.categoryIds)
    const priceRanges = useProductStore(state => state.priceRanges)
    const priceSlider = useProductStore(state => state.priceSlider)
    const searchQuery = useProductStore(state => state.searchQuery)
    const toggleCategory = useProductStore(state => state.toggleCategory)
    const togglePriceRange = useProductStore(state => state.togglePriceRange)
    const setSearchQuery = useProductStore(state => state.setSearchQuery)
    const setPriceSlider = useProductStore(state => state.setPriceSlider)
    const resetFilters = useProductStore(state => state.resetFilters)
    const hasActiveFilters = useHasActiveFilters()

    const queryClient = useQueryClient();




    const activeProductsQuery = useQuery({
        queryKey: QUERY_KEYS.activeProducts,
        queryFn: () => ProductService.getActiveProducts(),
        staleTime: 5 * 60 * 1000,
    });


    const filteredProductsQuery = useQuery({
        queryKey: [...QUERY_KEYS.filteredProducts, { categoryIds, priceRanges, searchQuery, priceSlider }],
        queryFn: () => ProductService.getFilteredProducts({
            categoryIds,
            priceRanges,
            searchQuery,
            priceSlider
        }),
        enabled: hasActiveFilters,
        staleTime: 2 * 60 * 1000,
    });


    const products = useMemo(() => {
        const baseProducts = filteredProductsQuery.data || activeProductsQuery.data || [];

        if (!baseProducts.length) return [];

        let result = [...baseProducts];

        // Apply client-side search filter if needed
        if (searchQuery) {
            const lowercaseQuery = searchQuery.toLowerCase();
            result = result.filter(product =>
                product.name.toLowerCase().includes(lowercaseQuery) ||
                product.description.toLowerCase().includes(lowercaseQuery) ||
                product.brand?.toLowerCase().includes(lowercaseQuery)
            );
        }

        // Apply price slider filter
        if (priceSlider && (priceSlider[0] > 0 || priceSlider[1] < 800)) {
            const [minPrice, maxPrice] = priceSlider;
            result = result.filter(product =>
                product.price >= minPrice && product.price <= maxPrice
            );
        }

        // Apply price range filters
        if (priceRanges.length > 0) {
            result = result.filter(product =>
                priceRanges.some(range => {
                    switch (range) {
                        case 'price1': return product.price < 20;
                        case 'price2': return product.price >= 20 && product.price <= 50;
                        case 'price3': return product.price > 50;
                        default: return true;
                    }
                })
            );
        }

        return result;
    }, [
        activeProductsQuery.data,
        filteredProductsQuery.data,
        searchQuery,
        priceSlider,
        priceRanges
    ]);

    const productDetailsQuery = useQuery({
        queryKey: QUERY_KEYS.product(productId ?? ''),
        queryFn: () => ProductService.getProductById(productId ?? ''),
        enabled: !!productId,
    });
    const allProductQuery = useQuery({
        queryKey: QUERY_KEYS.allProducts,
        queryFn: ProductService.getAllProducts,
        staleTime: 1000 * 60
    })

    const invalidateProductsCache = () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeProducts });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.filteredProducts });
    };

    return {

        products,

        activeProductsQuery,
        filteredProductsQuery,
        allProductQuery,
        // Filter state from Zustand
        filters: {
            categoryIds,
            priceRanges,
            searchQuery,
            priceSlider,
            hasActiveFilters
        },
        productDetailsQuery,
        // Filter actions
        filterActions: {
            toggleCategory,
            togglePriceRange,
            setSearchQuery,
            setPriceSlider,
            resetFilters
        },

        invalidateProductsCache
    };
};