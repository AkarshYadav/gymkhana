import { cn } from '@/lib/utils'
import React from 'react'

interface TitleProps {
    children:React.ReactNode,
    className?:string
}
function Title({children, className}: TitleProps) {
  return (
    <h2 className={cn("text-2xl font-semibold ", className)}>
        {children}
    </h2>
  )
}

export default Title
