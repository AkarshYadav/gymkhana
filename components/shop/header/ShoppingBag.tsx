"use client"
import React from 'react'
import { ShoppingBagIcon } from 'lucide-react'
import Link from 'next/link'
import useCartStore from '@/store'
function ShoppingCart() {
  const { items } = useCartStore()
  return (
    <Link href="/shop/cart" className='group relative'>
      <ShoppingBagIcon size={24} className='text-gray-600 dark:text-gray-300' />
      <span className='absolute -top-1 -right-1 bg-black text-white h-3.5 w-3.5 rounded-full text-xs flex items-center justify-center font-semibold'>{items.length ? items.length : 0}</span>
    </Link>
  )
}

export default ShoppingCart
