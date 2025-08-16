import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card"

interface SummarySectionProps {
    imageFields: Record<"id", string>[]
    tagFields: Record<"id", string>[]
    price: number
    hasDiscount: boolean | undefined
    originalPrice: number | null | undefined
    form: any
}

export const SummarySection = ({ imageFields, tagFields, price, hasDiscount, originalPrice, form }: SummarySectionProps) => {
    return (
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <CardHeader>
                <CardTitle className="text-lg">Resumen</CardTitle>
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
