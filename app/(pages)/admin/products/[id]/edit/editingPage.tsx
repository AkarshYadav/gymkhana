"use client"
import { useActionState, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/utils/formatter"
import { addProduct, updateProduct } from "@/actions/admin_actions/products"
import { Loader2 } from "lucide-react"
import { useFormStatus, useFormState } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"
export default function EditingPage({ product }: { product?: Product | null }) {
    const [error, action] = useFormState(
        product == null ? addProduct : updateProduct.bind(null, product.id),
        {}
    )
    const [price, setPrice] = useState<number | undefined>(product?.price)

    const handleSubmit = async (formData: FormData) => {
        try {
            await action(formData)
        } catch (error) {
            console.error('Form submission error:', error)
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-200">
            <form action={handleSubmit} className="bg-white mx-20 my-10 p-4 rounded-lg">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" type="text" name="name" defaultValue={product?.name} required />
                    {error?.name && <p className="text-red-500">{error.name}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="productPrice">Product Price</Label>
                    <Input
                        id="productPrice"
                        type="number"
                        name="productPrice"
                        required
                        defaultValue={product?.price}
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    {error?.productPrice && <p className="text-red-500">{error.productPrice}</p>}
                </div>
                <div className="text-muted-foreground">
                    {formatCurrency(price || 0)}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea id="description" name="description" defaultValue={product?.description} required />
                    {error?.description && <p className="text-red-500">{error.description}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <Input type="file" id="file" name="file" required={product == null} />
                    {product != null && (
                        <div className="text-muted-foreground">{product.filePath}</div>
                    )}
                    {error.file && <div className="text-destructive">{error.file}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <Input type="file" id="image" name="image" required={product == null} />
                    {product != null && (
                        <Image
                            src={product.imagePath}
                            height="400"
                            width="400"
                            alt="Product Image"
                        />
                    )}
                    {error.image && <div className="text-destructive">{error.image}</div>}
                </div>
                <div className="flex justify-start gap-4 mt-4">
                    <SubmitButton />
                    <Button variant="secondary" asChild>
                        <Link href="/admin/products">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? <Loader2 className="animate-spin text-white" /> : "Add"}
        </Button>
    )
}