import { Navbar } from '@/app/(pages)/admin/_components/(navbar)'

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
   return(
    <>
   <Navbar/>
   <div className='flex h-full pt-20'>
    {children}
   </div>


    </>
   )
}