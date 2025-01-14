import React from 'react'

interface SidebarProps{
    isOpen:boolean,
    onClose:()=>void
}
function Sidebar({isOpen, onClose}:SidebarProps) {
  return (
    <div className='fixed top-0 left-0 w-64 h-full bg-black/50 z-50 transform transition-transform duration-300 ease-in-out' >
      sidebar
    </div>
  )
}

export default Sidebar
