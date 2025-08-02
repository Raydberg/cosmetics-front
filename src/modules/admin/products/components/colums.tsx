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
        header: "Image",
        cell: () => (
            <div className="capitalize">Imagen</div>
        ),
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
    // {
    //     accessorKey: "email",
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 Email
    //                 <ArrowUpDown />
    //             </Button>
    //         )
    //     },
    //     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    // },
    // {
    //     accessorKey: "amount",
    //     header: () => <div className="text-right">Amount</div>,
    //     cell: ({ row }) => {
    //         const amount = parseFloat(row.getValue("amount"))

    //         const formatted = new Intl.NumberFormat("en-US", {
    //             style: "currency",
    //             currency: "PEN",
    //         }).format(amount)

    //         return <div className="text-right font-medium">{formatted}</div>
    //     },
    // },
    {
        accessorKey: "acctions",
        header: () => "Acciones",
        cell: () => {
            return (
                <div className='space-x-1'>
                    <Button variant={'outline'}>
                        <SquarePen />
                    </Button>
                    <Button variant={'destructive'}>
                        <Trash color='white' />
                    </Button>
                </ div>

            )
        },
    },
    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: () => {

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>

    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View customer</DropdownMenuItem>
    //                     <DropdownMenuItem>View payment details</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     },
    // },
]
