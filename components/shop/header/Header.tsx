import React from 'react'
import HeaderMenu from './headerMenu'
import {Logo} from '../logo'
import Container from '../Container'
import MoblieMenu from './moblieMenu'
import Searchbar from './Searchbar'
import ShoppingCart from './ShoppingCart'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className='py-2 border-b border-gray-200'>
        <Container className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
      <MoblieMenu/>
      <Logo/>
            </div>
      <HeaderMenu/>
       <div className='flex items-center gap-5  w-auto  justify-end'>
      <Searchbar/>
      <ShoppingCart/>
      <Button
      size="navbar"
      variant="link"
      >Login</Button>
       </div>
        </Container>
    </header>
  )
}

export default Header
