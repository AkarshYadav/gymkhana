import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import HeaderContent from './HeaderContent'

const Header = async () => {
  const user = await currentUser()
  return <HeaderContent userExists ={!!user}/>
}

export default Header