import type { ProductFormData } from "@/core/zod/admin/production-validation"
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card"
import type { UseFormReturn } from "react-hook-form"

export interface TagFieldItem {
    id: string
    value: string
}
export interface ImageFieldItem {
    id: string,
    value: string
}
export interface FieldArrayItem {
    id: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}
interface SummarySectionProps {
    imageFields: FieldArrayItem[]
    tagFields: FieldArrayItem[]
    price: number
    hasDiscount: boolean | undefined
    originalPrice: number | null | undefined
    form: UseFormReturn<ProductFormData>
    mode?: 'create' | 'edit'
}

export const SummarySection = ({
    imageFields,
    tagFields,
    price,
    hasDiscount,
    originalPrice,
    form,
    mode = 'create'
}: SummarySectionProps) => {
    return (
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <CardHeader>
                <CardTitle className="text-lg">
                    {mode === 'create' ? 'Resumen' : 'Resumen Actual'}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Imágenes:</span>
                    <span className="font-medium">{imageFields.length}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Etiquetas:</span>
                    <span className="font-medium">{tagFields.length}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Precio:</span>
                    <span className="font-medium">S/. {price || 0}</span>
                </div>
                {hasDiscount && originalPrice && (
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Descuento:</span>
                        <span className="font-medium text-green-600">
                            {form.watch('discountPercentage') || 0}%
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}