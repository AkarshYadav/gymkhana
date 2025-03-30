"use client";
import React, { useState } from 'react';
import useCartStore from '@/store';
import { useAuth, useUser } from '@clerk/nextjs';
import Container from '@/components/shop/Container';
import NoAccessWithoutSignIn from '@/components/shop/NoAccessWithoutSignIn';
import EmptyCartComponent from '@/components/shop/EmptyCartComponent';
import { ArrowRight, CreditCard, ShoppingBag, Truck, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import QuantityButton from '../product/[id]/_components/QuantityButton';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { createCheckoutSession, Metadata } from '@/actions/checkout/createCheckoutSession';


function Cartpage() {
  const {
    deleteCartProduct,
    getSubTotalPrice,
    getItemCount,
    resetCart,
    getGroupedItems
  } = useCartStore();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const cartProducts = getGroupedItems();

  const handleResetCart = () => {
    const confirmed = window.confirm('Are you sure you want to reset your cart?');
    if (confirmed) {
      resetCart();
      toast.success('Cart has been reset successfully');
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success('Product removed from cart');
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id
      };
  
      // Calculate values that we need for checkout
      const SHIPPING_FEE = subtotal > 999 ? 0 : 49;
      
      const checkoutData = {
        items: cartProducts,
        subtotal: subtotal,
        tax: tax,
        shipping: SHIPPING_FEE,
        total: total
      };
  
      const checkoutUrl = await createCheckoutSession(checkoutData, metadata)
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
  
    } catch (error) {
      console.log("Error creating checkout session :", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const { isSignedIn } = useAuth();


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const SHIPPING_FEE = 49;
  const TAX_RATE = 0.18; // 18% GST
  const subtotal = getSubTotalPrice();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + (subtotal > 999 ? 0 : SHIPPING_FEE);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-24 md:pb-16">
      {isSignedIn ? (
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="py-8"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              <h1 className="font-bold text-3xl text-slate-800 dark:text-white">Your Cart</h1>
            </motion.div>

            {cartProducts?.length ? (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Products view */}
                <div className="lg:col-span-2 space-y-6">
                  <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                      {cartProducts?.map(({ product }) => {
                        const itemCount = getItemCount(product?._id);
                        return (
                          <motion.div
                            key={product._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start p-4 md:p-5 gap-4 group relative"
                          >
                            <Link href={`/shop/product/${product?._id}`} className="shrink-0">
                              {product?.images && (
                                <div className="rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-all hover:shadow-md">
                                  <Image
                                    src={urlFor(product?.images[0]).url()}
                                    alt={product.title || 'Product image'}
                                    width={120}
                                    height={120}
                                    loading="lazy"
                                    className="object-cover aspect-square hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              )}
                            </Link>

                            <div className="flex-1 min-w-0">
                              <div className="space-y-1">
                                <div className="flex justify-between items-start">
                                  <Link href={`/shop/product/${product?._id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    <h3 className="font-semibold text-lg text-slate-800 dark:text-white line-clamp-1">{product.title}</h3>
                                  </Link>

                                  <div className="flex items-center ml-2">
                                    <button
                                      onClick={() => handleDeleteProduct(product._id)}
                                      className="p-1.5 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                                      aria-label="Remove item"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-1">{product.intro}</p>

                                {product.variant && (
                                  <Badge variant="outline" className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600">
                                    {product.variant}
                                  </Badge>
                                )}

                                {product.status && (
                                  <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800">
                                    {product.status}
                                  </Badge>
                                )}
                              </div>

                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <QuantityButton product={product} />
                                </div>
                                <div className="font-semibold text-lg text-slate-800 dark:text-white">
                                  ₹{((product.discount as number) * itemCount).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={handleResetCart}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear Cart</span>
                    </Button>

                    <Link href="/shop">
                      <Button variant="ghost" className="flex items-center gap-2 border-slate-200 dark:border-slate-700">
                        <span>Continue Shopping</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                {/* Order summary view */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                  <div className="sticky top-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-5 bg-slate-100 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white">Order Summary</h2>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                          <span>Subtotal :</span>
                          <span>₹{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                          <span>Shipping</span>
                          {subtotal > 999 ? (
                            <span className="text-green-600 dark:text-green-400">Free</span>
                          ) : (
                            <span>₹{SHIPPING_FEE}</span>
                          )}
                        </div>

                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                          <span>GST (18%)</span>
                          <span>₹{tax.toFixed(2)}</span>
                        </div>
                      </div>

                      <Separator className="my-4 bg-slate-200 dark:bg-slate-700" />

                      <div className="flex justify-between font-bold text-lg text-slate-800 dark:text-white">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>

                      {subtotal > 999 && (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                          <Truck className="w-4 h-4" />
                          <span>Free shipping on orders above ₹999</span>
                        </div>
                      )}

                      <Button
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg font-medium flex items-center justify-center gap-2"
                        onClick={handleCheckout}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span>Proceed to Checkout</span>
                      </Button>

                      <div className="text-xs text-center text-slate-500 dark:text-slate-400 mt-3">
                        Secure payments. Easy returns. Satisfaction guaranteed.
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <EmptyCartComponent />
            )}
          </motion.div>
        </Container>
      ) : (
        <Container>
          <NoAccessWithoutSignIn />
        </Container>
      )}
    </div>
  );
}

export default Cartpage;