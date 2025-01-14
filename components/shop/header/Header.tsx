import React from 'react'
import HeaderMenu from './headerMenu'
import { Logo } from '../logo'
import Container from '../Container'
import MoblieMenu from './moblieMenu'
import Searchbar from './Searchbar'
import ShoppingCart from './ShoppingBag'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { ClerkLoaded } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import { ListOrdered } from 'lucide-react'
import Link from 'next/link'
const Header = async () => {
  const user = await currentUser()
  return (
    <header className='py-2 border-b border-gray-200'>
      <Container className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <MoblieMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className='flex items-center gap-5  w-auto  justify-end'>
          <Searchbar />
          <ShoppingCart />
          <ClerkLoaded>
            <SignedIn>
              <Link href="/shop/orders" className='group relative'>
                <ListOrdered size={24} />
                <span className='absolute -top-1 -right-1 bg-black text-white h-3.5 w-3.5 rounded-full text-xs flex items-center justify-center font-semibold'>0</span>
              </Link>

            </SignedIn>
            {!user ? (<Button
              asChild
              size="navbar"
              variant="link">
              <SignInButton mode='modal' >Login</SignInButton>
            </Button>) : <UserButton />}
          </ClerkLoaded>

        </div>
      </Container>
    </header>
  )
}

export default Header
