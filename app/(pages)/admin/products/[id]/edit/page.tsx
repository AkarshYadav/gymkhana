import db from "@/utils/db";
import EditingPage from"./editingPage";

export default async function EditFormPage({params:{id}}:{params:{id:string}}) {
    const product = await db.product.findUnique({
        where:{
            id
        }
    });

    return (
        <EditingPage product ={product}/>
    )
}