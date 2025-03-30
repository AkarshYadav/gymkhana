import { ShoppingCartIcon } from "lucide-react"
import Link from "next/link"

export default function ShoppingKart() {
    return (
        <Link href="/shop">
        <ShoppingCartIcon className="text-gray-600 dark:text-gray-300"  />
        </Link>
    )
}