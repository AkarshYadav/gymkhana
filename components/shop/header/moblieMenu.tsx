"use client"

import React, { useState } from 'react'
import { AlignLeft } from 'lucide-react'
import Sidebar from './Sidebar'

function MoblieMenu() {
  const[isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
      <AlignLeft size={24} className='hover:cursor-pointer md:hidden' />
      <div className='md:hidden'>
        <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  )
}

export default MoblieMenu
