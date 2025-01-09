import db from "@/utils/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
    req:NextRequest,
    {params:{id}}:{params:{id:string}}

){
    const product = await db.product.findUnique({ where:{id}})
    if(product == null) return notFound();
    const {size} =await fs.stat(product.filePath)
    const file = await fs.readFile(product.filePath)
    const extension = product.filePath.split('.').pop()

    return new NextResponse(file, {headers:{
        'Content-Despostion': `attachment; filename ="${product.name}.${extension}"`,
        'Content-Length': size.toString()
    }})
}