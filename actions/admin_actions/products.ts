"use server"

import { z } from "zod"
import db from "@/utils/db"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
    file => file.size == 0 || file.type.startsWith("image/"),
    "File must be an image"
)
const addSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    productPrice: z.coerce.number().int().min(1, "Price must be greater than 0"),
    image: imageSchema.refine(file => file.size > 0, "Image is required"),
    file: fileSchema.refine(file => file.size > 0, "File is required"),
})

export async function addProduct(prevState: unknown, formData: FormData) {
    try {
        const results = addSchema.safeParse(Object.fromEntries(formData.entries()))
        
        if (!results.success) {
            return results.error.formErrors.fieldErrors
        }

        const data = results.data

        // Ensure directories exist
        await fs.mkdir("products", { recursive: true })
        await fs.mkdir("public/products", { recursive: true })

        // Generate unique file names
        const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
        const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`

        // Write files
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

        // Create database entry
        await db.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.productPrice,
                filePath,
                imagePath,
                isAvailableForPurchase: false,
            },
        })

        redirect("/admin/products")
    }catch (error) {
        console.error('Server action error:', error);
    
        // ✅ Ensure error is an instance of Error and contains the 'digest' property
        if (error instanceof Error && "digest" in error && typeof error.digest === "string") {
            if (error.digest.startsWith('NEXT_REDIRECT')) {
                console.error('Redirection error details:', error.digest);
            }
        }
    
        return {
            error: "Failed to create product. Please try again."
        };
    }
    
}

const editSchema = addSchema.extend({
    file:fileSchema.optional(),
    image: imageSchema.optional(),
})
export async function updateProduct(id:string,prevState: unknown, formData: FormData) {
    try {
        const results = editSchema.safeParse(Object.fromEntries(formData.entries()))
        
        if (!results.success) {
            return results.error.formErrors.fieldErrors
        }

        const data = results.data
        const product = await db.product.findUnique({where:{id}})

        if(product == null) return notFound();

        let filePath = product.filePath //keeping the old file
        if(data.file !=null && data.file.size > 0){
            await fs.unlink(product.filePath) //deleting the old file 
               filePath = `products/${crypto.randomUUID()}-${data.file.name}` //initializing new file path
              await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
        }

        let imagePath = product.imagePath 
        if(data.image!=null && data.image.size > 0){
            await fs.unlink(`public${product.imagePath}`) //deleting the old image
            imagePath = `/products/${crypto.randomUUID()}-${data.image.name}` //initializing new image path
            await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
        }
        // Create database entry
        await db.product.update({
            where:{id},
            data: {
                name: data.name,
                description: data.description,
                price: data.productPrice,
                filePath,
                imagePath,
            },
        })

        redirect("/admin/products")
    } catch (error) {
        console.error('Server action error:', error);
    
        // ✅ Ensure error is an instance of Error and contains the 'digest' property
        if (error instanceof Error && "digest" in error && typeof error.digest === "string") {
            if (error.digest.startsWith('NEXT_REDIRECT')) {
                console.error('Redirection error details:', error.digest);
            }
        }
    
        return {
            error: "Failed to create product. Please try again."
        };
    }
    
}

export  async function deleteProduct(id: string){
    const product = await db.product.delete({
        where:{
            id
        }
    })

    if(product == null) return notFound();
    //this is here so that on deleting the product, the file is also deleted from local storage
    await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)
}

export async function toggleProductAvaliablity(id: string, isAvailableForPurchase:boolean){
    await db.product.update({
        where:{
            id
        },
        data:{
            isAvailableForPurchase
        }
    })
}