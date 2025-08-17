import type { ProductInterface } from '@/core/interfaces/product.interface'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import type { ColumnDef } from '@tanstack/react-table'
import { SquarePen, Trash } from 'lucide-react'
import { Link } from 'react-router'


export const columns: ColumnDef<ProductInterface>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "images",
        header: () => (
            <p className='text-center'>Imagen</p>
        ),
        cell: ({ row }) => {
            const images = row.getValue("images") as string[];
            const imageUrl = images && images.length > 0 ? images[0] : '';
            const productName = row.getValue("name") as string;

            return (
                <div className="flex items-center justify-center p-1">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                            src={imageUrl || ''}
                            alt={productName || "Producto"}
                            className="w-full h-full object-cover transition-transform hover:scale-110 cursor-pointer"
                            onError={(e) => {
                                const target = e.currentTarget;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzNkMyNCAzNiAzMCAzMCAzNiAyNEMzNiAxOCAzMCAxMiAyNCAxMkMxOCAxMiAxMiAxOCAxMiAyNEMxMiAzMCAxOCAzNiAyNCAzNiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                            }}
                        />
                    </div>
                </div>
            );
        },
        size: 80
    },
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => (
            <div className="capitalize">S/. {row.getValue("price")}</div>
        ),
    },
    {
        accessorKey: "isActive",
        header: "Estado",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive") as boolean;

            return (
                <div className="capitalize flex items-center gap-1">
                    <Badge variant={isActive ? 'outline' : 'destructive'}>
                        {isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "hasDiscount",
        header: "Oferta",
        cell: ({ row }) => {
            const hasDiscount = row.getValue("hasDiscount") as boolean;

            return (
                <div className="capitalize">
                    <Badge variant={hasDiscount ? 'secondary' : 'default'}>
                        {hasDiscount ? 'En oferta' : 'No'}
                    </Badge>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-center">Acciones</div>,
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className='flex gap-1'>
                    <Link to={`/admin/update-product/${product.$id}`}>
                        <Button
                            className='cursor-pointer'
                            variant={'outline'}>
                            <SquarePen />
                        </Button>
                    </Link>
                    <Button
                        className='cursor-pointer'
                        onClick={() => alert(`Eliminar producto: ${product.name}`)}
                        variant={'destructive'}>
                        <Trash color='white' />
                    </Button>
                </ div>
            );
        },
    },
]