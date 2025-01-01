import {
    Table, 
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
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

function ProductsTable() {
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
                
            </TableBody>
        </Table>
    )
}