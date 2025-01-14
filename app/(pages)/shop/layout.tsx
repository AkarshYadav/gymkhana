import Header from "@/components/shop/header/Header";
import Container from "@/components/shop/Container";
import Footer from "@/components/shop/footer/Footer";
export default function shopLayout({children}:{
    children: React.ReactNode
}){
    return (
        <div>
            <Header/>
            <main>
                <Container className="py-10">
                    {children}
                </Container>
            </main>
            <Footer/>
        </div>
    )
}