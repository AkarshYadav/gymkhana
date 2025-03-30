import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

function Searchbar() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const query = `*[ _type == "product" && title match $search ] | order(name asc)`;
      const params = { search: `${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  // Function to handle product click
  const handleProductClick = () => {
    setShowSearch(false); // Close the dialog
    setSearch(""); // Optionally reset the search
  };

  return (
    <Dialog open={showSearch} onOpenChange={setShowSearch}>
      <DialogTrigger
        onClick={() => setShowSearch(true)}
        className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
      >
        <Search size={24} className="text-gray-800 dark:text-white" />
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col rounded-lg bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-black dark:text-white">
            Product Search
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Find your desired products quickly
          </DialogDescription>
        </DialogHeader>
        <motion.form
          className="relative flex items-center mt-4"
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Input
            placeholder="Enter the product to search..."
            className="w-full p-4 pr-12 text-lg rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all hover:scale-105"
          >
            <Search className="w-5 h-5" />
          </button>
        </motion.form>
        <div className="w-full h-full overflow-y-auto border border-black/10 rounded-lg p-4 mt-4">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Searching...</p>
          ) : products.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/shop/product/${product?._id}`}
                  onClick={handleProductClick}
                  className="block"
                >
                  <motion.div
                    className="flex gap-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="relative w-40 h-40 flex-shrink-0">
                      <Image
                        src={product.images?.[0]?.asset ? urlFor(product.images[0]).url() : '/placeholder.jpg'}
                        alt={product.title || 'Product image'}
                        fill
                        className="object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                          {product.intro}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ₹{product.discount}
                          </span>
                          {product.discount && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{product.price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <ShoppingBag size={18} />
                          <span>View Details</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              {search ? "No matching products found." : "Search and explore your products."}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Searchbar;