import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const userRequired = async()=>{
  const user = await currentUser()
    if (!user) {
        redirect("/shop")
    }
}