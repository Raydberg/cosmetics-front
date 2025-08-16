import type { CategoryInterface } from '@/core/interfaces/category.interface'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Textarea } from '@/shared/components/ui/textarea'
import { Package } from 'lucide-react'

interface ProductInformationProps {
    form: any
    categoriesLoading: boolean
    categories: CategoryInterface[]
}

export const ProductInformation = ({ form, categoriesLoading, categories }: ProductInformationProps) => {
    return (
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una categoría" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categoriesLoading ? (
                                            <SelectItem value="loading" disabled>
                                                Cargando categorías...
                                            </SelectItem>
                                        ) : (
                                            categories.map((category) => (
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
    )
}
