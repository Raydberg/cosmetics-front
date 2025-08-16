import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { Tag, Plus, X } from "lucide-react"
import type { SetStateAction } from "react"

interface TagsSectionsProps {
    newTag: string
    setNewTag: (value: SetStateAction<string>) => void
    addTag: () => void
    tagFields: Record<"id", string>[]
    removeTag: (index?: number | number[]) => void
}

export const TagsSections = ({ newTag, setNewTag, addTag, tagFields, removeTag }: TagsSectionsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-orange-600" />
                    Etiquetas
                </CardTitle>
                <CardDescription>
                    Agrega etiquetas para mejorar la búsqueda del producto
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Ej: perfume, lujo, floral"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1"
                    />
                    <Button
                        type="button"
                        onClick={addTag}
                        disabled={!newTag.trim()}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                        {tagFields.map((field, index) => (
                            <motion.div
                                key={field.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    {field.value}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                        onClick={() => removeTag(index)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    )
}
