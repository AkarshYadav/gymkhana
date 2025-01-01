import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
const Actions = () => {
    return(
        <>
         
            <div className="hidden md:flex items-center space-x-4">
                <Link href="#" className="text-lg font-semibold">Home</Link>
                <Link href="#" className="text-lg font-semibold">About</Link>
                <Link href="#" className="text-lg font-semibold">Services</Link>
                <Link href="#" className="text-lg font-semibold">Contact</Link>
            </div>
            <Link
            href="/shop">
            <div className="flex items-center hover:cursor-pointer">
            <ShoppingCart />
                <div className="hidden lg:flex items-center px-2 py-2 rounded-lg font-semibold">Shop</div>
            </div>
            </Link>
        </>
    )
}

export default Actions;