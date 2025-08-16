import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card'
import { ImageIcon } from 'lucide-react'
import { ImageUploader } from './image-uploader'
import type { FieldArrayMethodProps } from 'react-hook-form'

interface ImageSectionProps {
    imageFields: Record<"id", string>[]
    removeImage: (index?: number | number[]) => void
    form: any
    appendImage: (value: unknown, options?: FieldArrayMethodProps) => void
}

export const ImagesSection = ({ imageFields, removeImage, appendImage, form }: ImageSectionProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-blue-600" />
                    Imágenes del Producto
                </CardTitle>
                <CardDescription>
                    Sube imágenes del producto desde tu dispositivo (máximo 5 imágenes)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ImageUploader
                    onImagesChange={(images) => {
                        // Limpiar el array de imágenes actual
                        while (imageFields.length > 0) {
                            removeImage(0)
                        }
                        // Agregar las nuevas imágenes
                        images.forEach(imageUrl => appendImage(imageUrl))
                    }}
                    maxFiles={5}
                    existingImages={imageFields.map(field => field.value)}
                />

                {/* Mostrar errores de validación */}
                {form.formState.errors.images && (
                    <p className="text-sm text-red-500 mt-2">
                        {form.formState.errors.images.message}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
