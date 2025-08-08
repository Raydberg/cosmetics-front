import { useCallback, useRef, useState } from "react"

interface CacheItem<T> {
    data: T,
    timestamp: number
    expiresAt: number
}

interface UseCacheOptions {
    defaultTTL?: number
    maxSize?: number
}


export const useCache = <T>(options: UseCacheOptions = {}) => {
    const { defaultTTL = 5 * 60 * 1000, maxSize = 100 } = options

    const cacheRef = useRef<Map<string, CacheItem<T>>>(new Map())
    const [cacheSize, setCacheSize] = useState<number>(0)
    const cleanExpired = useCallback(() => {
        const now = Date.now()
        const cache = cacheRef.current
        let cleaned = false


        for (const [key, item] of cache.entries()) {
            if (now > item.expiresAt) {
                cache.delete(key)
                cleaned = true
            }
        }
        if (cleaned) {
            setCacheSize(cache.size)
        }
    }, [])

    /**
     * Obtener el cache
     */

    const get = useCallback((key: string): T | null => {
        cleanExpired()
        const item = cacheRef.current.get(key)

        if (!item) return null;

        if (Date.now() > item.expiresAt) {
            cacheRef.current.delete(key)
            setCacheSize(cacheRef.current.size)
            return null;
        }
        return item.data;
    }, [cleanExpired])

    //Guardar cache
    const set = useCallback((key: string, data: T, ttl?: number): void => {
        const cache = cacheRef.current
        const now = Date.now()

        const expiresAt = now + (ttl || defaultTTL)

        if (cache.size >= maxSize) {
            const oldesKey = cache.keys().next().value
            if (oldesKey) {
                cache.delete(oldesKey)
            }
        }

        cache.set(key, {
            data, timestamp: now, expiresAt
        })
        setCacheSize(cache.size)
    }, [defaultTTL, maxSize])

    //Verifica si expiro o no 

    const has = useCallback((key: string): boolean => {
        return get(key) !== null
    }, [get])


    //Eliminar cache

    const remove = useCallback((key: string): boolean => {
        const result = cacheRef.current.delete(key)
        if (result) {
            setCacheSize(cacheRef.current.size)
        }
        return result;
    }, [])

    // Limpiar todo el cache

    const clear = useCallback(() => {
        cacheRef.current.clear()
        setCacheSize(0)
    }, [])

    // Estadisticas del cache
    const getStats = useCallback(() => {
        cleanExpired()
        return {
            size: cacheRef.current.size,
            maxSize,
            hitRate: 0
        }
    }, [cleanExpired, maxSize])

    return {
        get, set, has, remove, clear, getStats, size: cacheSize
    }


}




