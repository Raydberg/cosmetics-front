import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/shared/components/ui/button';
import { AlertCircle, ArrowLeft, DollarSign, ImageIcon, Info, Package, RefreshCw, Save, Sparkles } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import { useProduct } from '@/modules/client/hooks/useProduct';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { useForm } from 'react-hook-form';
import { ProductSchema } from '@/core/zod/product-shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useCategory } from '@/core/hooks/useCategory';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Switch } from '@/shared/components/ui/switch';
import { Separator } from '@/shared/components/ui/separator';
import { toast } from 'sonner';
import { useFieldArray } from 'react-hook-form';
import { ImageUploader } from './components/image-uploader';
import type { ProductInterface } from '@/core/interfaces/product.interface';

type ProductFormData = z.infer<typeof ProductSchema>;

export const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { productDetailsQuery, updateProductMutation } = useProduct({ productId: id });
  const { categoryActiveQuery } = useCategory();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      originalPrice: null,
      discountPercentage: 0,
      hasDiscount: false,
      images: [],
      categoryId: '',
      stock: 0,
      featured: false,
      isActive: true,
      brand: '',
      tags: []
    }
  });

  // Inicializar el formulario cuando los datos están disponibles
  useEffect(() => {
    if (productDetailsQuery.data) {
      form.reset({
        ...productDetailsQuery.data,
        // Asegurarse de convertir la ID de categoría correctamente
        categoryId: typeof productDetailsQuery.data.categoryId === 'string'
          ? productDetailsQuery.data.categoryId
          : productDetailsQuery.data.categoryId.$id,
        // Proporcionar valores por defecto para evitar problemas
        tags: productDetailsQuery.data.tags || []
      });
    }
  }, [productDetailsQuery.data, form]);

  // Arrays para imágenes y tags
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: 'images'
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control: form.control,
    name: 'tags'
  });

  // Observar cambios para cálculo automático de descuentos
  const hasDiscount = form.watch('hasDiscount');
  const price = form.watch('price');
  const originalPrice = form.watch('originalPrice');

  // Calcular porcentaje de descuento automáticamente
  useEffect(() => {
    if (hasDiscount && originalPrice && price && originalPrice > price) {
      const percentage = Math.round(((originalPrice - price) / originalPrice) * 100);
      form.setValue('discountPercentage', percentage);
    } else if (!hasDiscount) {
      form.setValue('discountPercentage', 0);
      form.setValue('originalPrice', null);
    }
  }, [hasDiscount, price, originalPrice, form]);

  // Función para enviar el formulario
  const onSubmit = async (data: ProductFormData) => {
    if (!id) {
      toast.error('ID de producto no encontrado');
      return;
    }

    setIsSubmitting(true);
    try {
      // Obtener el producto original para comparación
      const originalData = productDetailsQuery.data;
      const changedFields: Partial<ProductInterface> = {};

      // Función de utilidad para comparar valores - considera null, undefined y valores vacíos
      const isValueChanged = (newValue: any, originalValue: any): boolean => {
        // Si ambos son null/undefined, no hay cambio
        if (newValue == null && originalValue == null) return false;

        // Si uno es null/undefined y el otro no, hay cambio
        if (newValue == null || originalValue == null) return true;

        // Si son cadenas vacías, tratarlas de manera especial
        if (typeof newValue === 'string' && typeof originalValue === 'string') {
          return newValue.trim() !== originalValue.trim();
        }

        // Comparación normal para otros tipos
        return newValue !== originalValue;
      };

      // Verificar campos individuales que deseas poder actualizar
      if (isValueChanged(data.name, originalData?.name))
        changedFields.name = data.name;

      // Añadir verificación para la descripción
      if (isValueChanged(data.description, originalData?.description))
        changedFields.description = data.description;

      // Añadir otros campos que deseas actualizar
      if (isValueChanged(data.price, originalData?.price))
        changedFields.price = data.price;

      if (isValueChanged(data.stock, originalData?.stock))
        changedFields.stock = data.stock;

      if (isValueChanged(data.brand, originalData?.brand))
        changedFields.brand = data.brand ;

      if (isValueChanged(data.categoryId, originalData?.categoryId.$id || originalData?.categoryId))
        changedFields.categoryId = data.categoryId;

      if (isValueChanged(data.isActive, originalData?.isActive))
        changedFields.isActive = data.isActive;

      if (isValueChanged(data.featured, originalData?.featured))
        changedFields.featured = data.featured;

      if (isValueChanged(data.hasDiscount, originalData?.hasDiscount))
        changedFields.hasDiscount = data.hasDiscount;

      if (isValueChanged(data.originalPrice, originalData?.originalPrice))
        changedFields.originalPrice = data.originalPrice;

      if (isValueChanged(data.discountPercentage, originalData?.discountPercentage))
        changedFields.discountPercentage = data.discountPercentage;

      // Para arrays, usamos comparación más sofisticada
      if (JSON.stringify(data.tags) !== JSON.stringify(originalData?.tags))
        changedFields.tags = data.tags;

      if (JSON.stringify(data.images) !== JSON.stringify(originalData?.images))
        changedFields.images = data.images;

      console.log('Campos modificados a enviar:', changedFields);

      // Si no hay campos modificados, no hacer la petición
      if (Object.keys(changedFields).length === 0) {
        toast.info('No se detectaron cambios para actualizar');
        setIsSubmitting(false);
        return;
      }

      await updateProductMutation.mutateAsync({
        id,
        data: changedFields
      });

      toast.success('Producto actualizado con éxito');
      // navigate('/admin');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      toast.error(`Error al actualizar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estado de carga inicial
  if (productDetailsQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg">Cargando información del producto...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (productDetailsQuery.error || !productDetailsQuery.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Error al cargar el producto
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No se pudo cargar la información del producto. Por favor intenta nuevamente.
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => productDetailsQuery.refetch()}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reintentar
                </Button>
                <Link to="/admin" viewTransition>
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al panel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link to={'/admin'} className='cursor-pointer'>
              <Button variant="outline" size="sm" type="button">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Editar Producto
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {`Editando: ${productDetailsQuery.data?.name}`}
              </p>
            </div>
          </div>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Información básica */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-purple-600" />
                        Información del Producto
                      </CardTitle>
                      <CardDescription>
                        Información básica y descripción del producto
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del producto *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ej: Perfume Elegance Premium"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe las características y beneficios del producto..."
                                rows={4}
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                              />
                            </FormControl>
                            <FormDescription>
                              {field.value?.length || 0}/500 caracteres
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="brand"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Marca</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ej: Elegance Paris"
                                  {...field}
                                  value={field.value || ''}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="categoryId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Categoría *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value?.toString() || ''}
                                value={field.value?.toString() || ''}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una categoría" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categoryActiveQuery.isLoading ? (
                                    <SelectItem value="loading" disabled>
                                      Cargando categorías...
                                    </SelectItem>
                                  ) : (
                                    categoryActiveQuery.data?.map((category) => (
                                      <SelectItem key={category.$id} value={category.$id!}>
                                        {category.name}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Precios */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Precios y Descuentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio actual *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">S/.</span>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    className="pl-10"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock disponible *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="0"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      <FormField
                        control={form.control}
                        name="hasDiscount"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">
                                ¿Tiene descuento?
                              </FormLabel>
                              <FormDescription>
                                Activa si el producto tiene precio rebajado
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <AnimatePresence>
                        {hasDiscount && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="originalPrice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Precio original</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">S/.</span>
                                        <Input
                                          type="number"
                                          step="0.01"
                                          min="0"
                                          placeholder="0.00"
                                          className="pl-10"
                                          value={field.value || ''}
                                          onChange={(e) => field.onChange(parseFloat(e.target.value) || null)}
                                        />
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="discountPercentage"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Descuento (%)</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type="number"
                                          min="0"
                                          max="100"
                                          placeholder="0"
                                          value={field.value || 0}
                                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                          readOnly
                                          className="bg-gray-50"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                      </div>
                                    </FormControl>
                                    <FormDescription>
                                      Se calcula automáticamente
                                    </FormDescription>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Imágenes */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-blue-600" />
                        Imágenes del Producto
                      </CardTitle>
                      <CardDescription>
                        Sube imágenes del producto (máximo 5 imágenes)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ImageUploader
                        onImagesChange={(images) => {
                          // Limpiar el array de imágenes actual
                          while (imageFields.length > 0) {
                            removeImage(0);
                          }
                          // Agregar las nuevas imágenes
                          images.forEach(imageUrl => {
                            appendImage(imageUrl);
                          });
                        }}
                        maxFiles={5}
                      // existingImages={imageFields.map(field => field.value)}
                      />

                      {/* Mostrar errores de validación */}
                      {form.formState.errors.images && (
                        <p className="text-sm text-red-500 mt-2">
                          {form.formState.errors.images.message}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Estados */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-600" />
                        Estado del Producto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>Producto activo</FormLabel>
                              <FormDescription className="text-xs">
                                Visible en la tienda
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel className="flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                Destacado
                              </FormLabel>
                              <FormDescription className="text-xs">
                                Aparece en productos destacados
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Acciones */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    disabled={isSubmitting || updateProductMutation.isPending}
                  >
                    {isSubmitting || updateProductMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Guardando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Guardar Cambios
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/admin')}
                  >
                    Cancelar
                  </Button>
                </motion.div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};