"use server"
import stripe from "@/lib/stripe"
import { urlFor } from "@/sanity/lib/image"
import {CartItem} from "@/store"
import Stripe from "stripe"

export interface Metadata{
    orderNumber:string,
    customerName:string,
    customerEmail:string,
    clerkUserId:string
}

export interface CheckoutData {
    items: CartItem[],
    subtotal: number,
    tax: number,
    shipping: number,
    total: number
}

export async function createCheckoutSession(checkoutData: CheckoutData, metadata: Metadata){
    const { items, subtotal, tax, shipping, total } = checkoutData;
    
    try {
        const customers = await stripe.customers.list({
            email: metadata?.customerEmail,
            limit: 1,
        });
        const customerId = customers.data.length > 0 ? customers.data[0].id : "";
        
        const sessionPayload: Stripe.Checkout.SessionCreateParams = {
            metadata: {
                orderNumber: metadata?.orderNumber,
                customerName: metadata?.customerName,
                customerEmail: metadata?.customerEmail,
                clerkUserId: metadata?.clerkUserId
            },
            mode: "payment",
            payment_method_types: ["card"],
            allow_promotion_codes: true,
            invoice_creation: {
                enabled: true
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata?.orderNumber}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/cart`,
            line_items: items.map((item) => ({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: item.product.title,
                        description: item.product.intro!,
                        metadata: {id: item.product._id},
                        images: item.product.images && item.product.images.length > 0 ? [urlFor(item.product.images[0]).url()]: undefined
                    },
                    unit_amount: Math.round(item.product.discount! * 100)
                },
                quantity: item.quantity
            }))
        };
        
        // Add tax as a separate line item
        if (tax > 0) {
            sessionPayload.line_items?.push({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "GST (18%)",
                        description: "Goods and Services Tax"
                    },
                    unit_amount: Math.round(tax * 100)
                },
                quantity: 1
            });
        }
        
        // Add shipping fee as a separate line item if applicable
        if (shipping > 0) {
            sessionPayload.line_items?.push({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Shipping Fee",
                        description: "Standard shipping"
                    },
                    unit_amount: Math.round(shipping * 100)
                },
                quantity: 1
            });
        }
        
        if (customerId) {
            sessionPayload.customer = customerId;
        } else {
            sessionPayload.customer_email = metadata.customerEmail;
        }
        
        const session = await stripe.checkout.sessions.create(sessionPayload);
        return session.url;
    } catch (error) {
        console.error("Error creating checkout session", error);
        throw error;
    }
}