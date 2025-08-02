import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Switch } from '@/shared/components/ui/switch'
import type { ColumnDef } from '@tanstack/react-table'
import { SquarePen, Trash } from 'lucide-react'


export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
    image?: string
}

export const columns: ColumnDef<Payment>[] = [
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
        accessorKey: "image",
        header: () => (
            <>
                <p className='text-center'>Imagen</p>
            </>
        ),
        cell: ({ row }) => {
            const imageUrl = row.getValue("image") as string;
            const productName = row.getValue("name") as string;

            return (
                <div className="flex items-center justify-center p-1">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                            src={imageUrl || 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/essential-oil-01.jpg'}
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
        cell: () => (
            <div className="capitalize">Nombre</div>
        ),
    },
    {
        accessorKey: "price",
        header: "Precio",
        cell: () => (
            <div className="capitalize">Precio</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <div className="capitalize flex items-center gap-1">
                <Switch />
                {row.getValue("status")}
            </div>
        ),
    },
    {
        accessorKey: "oferta",
        header: "Oferta",
        cell: () => (
            <div className="capitalize">
                Oferta
            </div>
        ),
    },
    {
        accessorKey: "acctions",
        header: () => "Acciones",
        cell: () => {
            return (
                <div className='flex gap-1'>
                    <Button
                        className='cursor-pointer'
                        onClick={() => alert("Editar producto")}
                        variant={'outline'}>
                        <SquarePen />
                    </Button>
                    <Button
                        className='cursor-pointer'
                        onClick={() => alert("Eliminar Producto")}
                        variant={'destructive'}>
                        <Trash color='white' />
                    </Button>
                </ div>

            )
        },
    },

]
