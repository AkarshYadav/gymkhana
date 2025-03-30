import { getProductById } from "@/sanity/lib/helpers/queries";
import { notFound } from "next/navigation";
import Container from "@/components/shop/Container";
import ProductImages from "./_components/ProductImages";
import ProductInfo from "./_components/ProductInfo";


export default async function SingleProductPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);

    if (!product) return notFound();

    return (
        <div className="min-h-screen py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black transition-colors duration-300">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <ProductImages images={product?.images} />
                    <ProductInfo product={product} />
                </div>
            </Container>
        </div>
    );
}
