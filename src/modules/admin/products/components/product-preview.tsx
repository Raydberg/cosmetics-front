import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Eye } from 'lucide-react'
import { ProductCard } from '@/shared/components/product-card'
import type { ProductInterface } from '@/core/interfaces/product.interface'

interface ProductPreviewProps {
  formData: any // Los datos del formulario actual
  categories: any[] // Para obtener el nombre de la categoría
}

export const ProductPreview = ({ formData, categories }: ProductPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Crear un objeto producto para la vista previa
  const previewProduct: ProductInterface = {
    $id: 'preview',
    name: formData.name || 'Producto sin nombre',
    description: formData.description || 'Sin descripción',
    price: formData.price || 0,
    originalPrice: formData.originalPrice || undefined,
    discountPercentage: formData.discountPercentage || 0,
    hasDiscount: formData.hasDiscount || false,
    images: formData.images || [],
    categoryId: formData.categoryId || '',
    stock: formData.stock || 0,
    featured: formData.featured || false,
    isActive: formData.isActive || true,
    brand: formData.brand || '',
    tags: formData.tags || []
  }

  const categoryName = categories.find(c => c.$id === formData.categoryId)?.name || 'Sin categoría'

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button">
          <Eye className="h-4 w-4 mr-2" />
          Vista previa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Vista Previa del Producto</h3>
            <p className="text-sm text-gray-600">Así se verá tu producto en la tienda</p>
          </div>

          {/* Vista como ProductCard */}
          <div className="flex justify-center">
            <div className="w-80">
              <ProductCard product={previewProduct} />
            </div>
          </div>

          {/* Información adicional */}
          <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
            <div>
              <strong>Categoría:</strong> {categoryName}
            </div>
            <div>
              <strong>Stock:</strong> {formData.stock || 0}
            </div>
            <div>
              <strong>Estado:</strong> {formData.isActive ? 'Activo' : 'Inactivo'}
            </div>
            <div>
              <strong>Destacado:</strong> {formData.featured ? 'Sí' : 'No'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}