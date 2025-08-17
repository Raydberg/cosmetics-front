import type { ProductFormData } from "@/core/zod/admin/production-validation"
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card"
import { FormField, FormItem, FormLabel, FormDescription, FormControl } from "@/shared/components/ui/form"
import { Switch } from "@/shared/components/ui/switch"
import { Info, Sparkles } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"

interface StateSectionProps {
    form: UseFormReturn<ProductFormData>
}

export const StateSection = ({ form }: StateSectionProps) => {
    return (

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

    )
}
