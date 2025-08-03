export const COLLECTIONS = {
    PRODUCT: import.meta.env.VITE_COLLECTION_PRODUCT,
    CATEGORY: import.meta.env.VITE_COLLECTION_CATEGORY
} as const

const validateCollections = () => {
    const missing = Object.entries(COLLECTIONS).filter(([value]) => !value)
    if (missing.length > 0) {
        console.error('Missing collection IDs:', missing.map(([key]) => key));
    }
}
validateCollections();
