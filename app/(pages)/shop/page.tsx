import HomeBanner from "@/components/shop/hero/HomeBanner"
import ShoppingGrid from "@/components/shop/hero/ShoppingGrid"

export default async function Shop() {

    // In page.tsx
    const response = await fetch('https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=*[_type == "product"]{_id,title,intro,images[] { "url": asset->url },price,discount,status,variant,stock}');
    const data = await response.json();
    const products = data.result; 

    return (
        <div className="space-y-6">
            <HomeBanner></HomeBanner>
            <ShoppingGrid products={products}></ShoppingGrid>
        </div>
    )
}