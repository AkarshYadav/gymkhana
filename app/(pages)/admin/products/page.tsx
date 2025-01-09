import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Plus, CheckCircle2, XCircle, MoreVertical } from "lucide-react"
import Link from "next/link"
import db from "@/utils/db"
import { formatCurrency, formatNumber } from "@/utils/formatter"
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_actions/productActions" 
export default function AdminProductsPage() {
    return (
        <div className="bg-slate-200 w-full min-h-screen">
            <div className="bg-white mx-10 my-10 p-4 rounded-lg">
                <div className="flex justify-between items-center gap-4 mx-4 mb-2 md:mb-4">
                    <h1 className="text-xl">Products List</h1>
                    <Button asChild>
                        <Link href="/admin/products/new">
                            <span className="block md:hidden">
                                <Plus />
                            </span>
                            <span className="hidden md:flex items-center gap-2">
                                <Plus />
                                Add Product
                            </span>
                        </Link>
                    </Button>
                </div>
                <ProductsTable />
            </div>
        </div>
    )
}

async function ProductsTable() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true } }
        },
        orderBy: {
            name: "asc"
        }
    })

    if (products.length === 0) return (<p>No products found</p>)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available for Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell className="w-0">
                            {product.isAvailableForPurchase ?
                                <>
                                    <span className="sr-only">Available</span>
                                    <CheckCircle2 className="stroke-green-500"/></> : <>
                                    <span className="sr-only">Unavailable</span>
                                    <XCircle className="stroke-destructive" /></>}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell className="w-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem
                                        id={product.id}
                                        isAvailableForPurchase={product.isAvailableForPurchase}>
                                    </ActiveToggleDropdownItem>
                                    <DropdownMenuSeparator />
                                    <DeleteDropdownItem
                                        id={product.id}
                                        disabled={product._count.orders > 0}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}


