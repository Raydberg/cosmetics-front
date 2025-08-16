import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { toast } from 'sonner'

interface ImageUploaderProps {
  onImagesChange: (images: string[]) => void
  maxFiles?: number
  existingImages?: string[]
  className?: string
}

export const ImageUploader = ({ 
  onImagesChange, 
  maxFiles = 5, 
  existingImages = [],
  className = ""
}: ImageUploaderProps) => {
  const [images, setImages] = useState<Array<{ file: File; preview: string; id: string }>>(
    existingImages.map((url, index) => ({
      file: new File([], `existing-${index}`, { type: 'image/jpeg' }),
      preview: url,
      id: `existing-${index}`
    }))
  )
  const [uploading, setUploading] = useState<string[]>([])

  // Función para simular upload (reemplaza con tu lógica de upload real)
  const uploadFile = async (file: File): Promise<string> => {
    // Simular upload delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Aquí implementarías la lógica real de upload a tu servicio
    // Por ejemplo: upload a Appwrite Storage, Cloudinary, etc.
    
    // Por ahora, crear un URL temporal para desarrollo
    return URL.createObjectURL(file)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxFiles) {
      toast.error(`Máximo ${maxFiles} imágenes permitidas`)
      return
    }

    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}-${Math.random()}`
    }))

    setImages(prev => [...prev, ...newImages])

    // Upload cada archivo
    for (const imageData of newImages) {
      setUploading(prev => [...prev, imageData.id])
      
      try {
        const uploadedUrl = await uploadFile(imageData.file)
        
        // Actualizar la imagen con la URL del servidor
        setImages(prev => 
          prev.map(img => 
            img.id === imageData.id 
              ? { ...img, preview: uploadedUrl }
              : img
          )
        )
        
        setUploading(prev => prev.filter(id => id !== imageData.id))
        toast.success('Imagen subida correctamente')
        
      } catch (error) {
        console.error('Error uploading:', error)
        toast.error('Error al subir la imagen')
        setImages(prev => prev.filter(img => img.id !== imageData.id))
        setUploading(prev => prev.filter(id => id !== imageData.id))
      }
    }
  }, [images.length, maxFiles])

  const removeImage = (id: string) => {
    setImages(prev => {
      const newImages = prev.filter(img => img.id !== id)
      const urls = newImages.map(img => img.preview)
      onImagesChange(urls)
      return newImages
    })
  }

  // Actualizar parent component cuando cambien las imágenes
  const imageUrls = images.map(img => img.preview)
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxFiles - images.length,
    disabled: images.length >= maxFiles
  })

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Dropzone */}
      <motion.div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive 
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }
          ${images.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        whileHover={{ scale: images.length >= maxFiles ? 1 : 1.02 }}
        whileTap={{ scale: images.length >= maxFiles ? 1 : 0.98 }}
      >
        <input {...getInputProps()} />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <Upload className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {isDragActive ? 'Suelta las imágenes aquí' : 'Arrastra imágenes o haz clic'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PNG, JPG, WEBP hasta 10MB • {images.length}/{maxFiles} imágenes
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Grid de imágenes */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {images.map((imageData, index) => (
              <motion.div
                key={imageData.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Badge de imagen principal */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Principal
                    </span>
                  </div>
                )}

                {/* Loading overlay */}
                {uploading.includes(imageData.id) && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-xs">Subiendo...</span>
                    </div>
                  </div>
                )}

                {/* Imagen */}
                <img
                  src={imageData.preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/200x200?text=Error'
                  }}
                />

                {/* Overlay con acciones */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(imageData.id)}
                    disabled={uploading.includes(imageData.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Vista previa del nombre del archivo */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-white text-xs truncate">
                    {imageData.file.name || `Imagen ${index + 1}`}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Información adicional */}
      {images.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            <ImageIcon className="inline h-4 w-4 mr-1" />
            {images.length} imagen{images.length !== 1 ? 'es' : ''} seleccionada{images.length !== 1 ? 's' : ''}
          </span>
          <span>La primera imagen será la principal</span>
        </div>
      )}
    </div>
  )
}