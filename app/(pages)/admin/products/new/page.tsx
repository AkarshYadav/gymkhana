"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/utils/formatter"
import { addProduct } from "@/actions/admin_actions/products"
export default function NewProductPage() {

    const [price, setPrice] = useState<number>(0)
    return (
        <div className=" w-full min-h-screen bg-slate-200 ">
        <form action={addProduct} className="bg-white mx-20 my-10 p-4 rounded-lg">
            <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" type="text" name="productName" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="productPrice">Product Price</Label>
                <Input id="productPrice" type="number" name="productPrice" required value={price} onChange={e=>setPrice(Number(e.target.value))} />
            </div>
            <div className="text-muted-foreground">
                {formatCurrency(price || 0)}
            </div>
            <div className="space-y-2">
                <Label htmlFor="productDescription">Product Description</Label>
                <Textarea id="productDescription" name="productDescription" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <Input id="image" type="file" name="productImage" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input id="file" type="file" name="file" required/>
            </div>
            <div className="flex justify-start gap-4 mt-4">
                <Button type="submit">Add</Button>
                <Button variant="secondary" asChild >
                    <Link href="/admin/products">
                    Cancel
                    </Link>
                </Button>
            </div>
        </form>
        </div>
    )
}