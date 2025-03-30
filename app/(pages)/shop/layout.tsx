import Header from "@/components/shop/header/Header";
import Container from "@/components/shop/Container";
import Footer from "@/components/shop/footer/Footer";
export default function shopLayout({children}:{
    children: React.ReactNode
}){
    return (
        <div>
            <Header/>
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10">
                <Container >
                    {children}
                </Container>
            </main>
            <Footer/>
        </div>
    )
}