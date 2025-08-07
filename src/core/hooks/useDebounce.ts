import { useEffect, useRef, useCallback } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): [T, () => void] => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }, [])

    const debouncedCallback = useCallback((...args: Parameters<T>) => {
        cancel()
        timeoutRef.current = setTimeout(() => {
            callbackRef.current(...args)
        }, delay)
    }, [delay, cancel]) as T

    useEffect(() => {
        return () => {
            cancel()
        }
    }, [cancel])

    return [debouncedCallback, cancel]
}