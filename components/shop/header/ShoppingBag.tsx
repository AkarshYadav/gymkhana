import React from 'react'
import { ShoppingBagIcon } from 'lucide-react'
import Link from 'next/link'
function ShoppingCart() {
  return (
    <Link href="/bag" className='group relative'>
      <ShoppingBagIcon size={24} />
      <span className='absolute -top-1 -right-1 bg-black text-white h-3.5 w-3.5 rounded-full text-xs flex items-center justify-center font-semibold'>0</span>
    </Link>
  )
}

export default ShoppingCart
