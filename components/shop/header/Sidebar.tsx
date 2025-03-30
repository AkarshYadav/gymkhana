import React from 'react'
import { motion } from 'motion/react'
import { Logo } from '../logo'
import { X } from 'lucide-react'
import SiderMenu from './sidbarMenu'

interface SidebarProps {
  isOpen: boolean,
  onClose: () => void
}
function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} >
      <motion.div className='text-white min-w-72 max-w-96 h-full flex flex-col gap-6 p-6 bg-black'>
        <div className='flex items-center justify-between '>
          <Logo />
          <button
          onClick={onClose}
           >
            <X size={24}  className='hover:stroke-red-500' />
          </button>

        </div>
          <SiderMenu />
        
      </motion.div>
    </div>
  )
}

export default Sidebar



