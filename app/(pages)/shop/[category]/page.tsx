"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ShoppingGrid from "@/components/shop/hero/ShoppingGrid";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Suspense } from "react"
import NoProducts from "@/components/shop/NoProducts";
import { Loader2, AlertCircle } from "lucide-react";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface Product {
    _id: string;
    title: string;
    intro: string;
    images: { url: string }[];
    price: number;
    discount: number;
    status: string;
    variant: string;
    stock: number;
}

const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const sanityProjectId = "aiqtrfyk";
    const dataset = "production";
    const apiVersion = "2025-01-26";

    // Function to capitalize first letter
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    // Get the proper category name
    let sanityCategory = category;

    // If the category ends with 's' (like 'mens', 'womens'), remove it and capitalize
    if (category.endsWith('s')) {
        sanityCategory = capitalizeFirstLetter(category.slice(0, -1));
    } else {
        sanityCategory = capitalizeFirstLetter(category);
    }

    // Special case for "Featured" if needed
    if (category.toLowerCase() === 'features') {
        sanityCategory = 'Featured';
    }

    console.log("URL category:", category);
    console.log("Mapped Sanity category:", sanityCategory);

    const query = encodeURIComponent(
        `*[_type == "product" && "${sanityCategory}" in category[]->title]{
            _id,
            title,
            intro,
            images[] { "url": asset->url },
            price,
            discount,
            status,
            variant,
            stock
        }`
    );

    const url = `https://${sanityProjectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched products:", data.result);
        return data.result;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export default function CategoryPage() {
    const pathname = usePathname();
    const category = pathname.split("/").pop() || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (category) {
            setLoading(true);
            setError(null);
            fetchProductsByCategory(category)
                .then((data) => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [category]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-500">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
                <div className="text-lg font-medium text-gray-600">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-500">
                <AlertCircle className="h-8 w-8 text-red-500 animate-bounce mb-4" />
                <div className="text-lg font-medium text-red-500">Error loading products</div>
                <div className="text-gray-500 mt-2">{error}</div>
            </div>
        );
    }


    return (
        <div className={cn("space-y-6 ", font.className)}>
            <Suspense fallback={<div>Loading...</div>}>
                {products.length > 0 ? (
                    <ShoppingGrid products={products} />
                ) : (
                    <NoProducts />
                )}
            </Suspense>
        </div>
    );
}