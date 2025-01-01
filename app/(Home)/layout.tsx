
import { Navbar } from '../_components/(navbar)';

export  default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <>
        <Navbar />
        <div>
           {children}
        </div>
        
        </>
    )
}