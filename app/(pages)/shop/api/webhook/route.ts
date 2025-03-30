import { Metadata } from "@/actions/checkout/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { error } from "console";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { number } from "zod";

export async function POST(req: NextRequest){
    const body = await req.text();
    const headerList = await headers();
    const sig = headerList.get("stripe-signature");
    if(!sig){
        return NextResponse.json(
            {
                error:"No stripe signature"
            },
            {
                status:400
            }
        )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
    if(!webhookSecret){
        console.log("No stripe secret webhook is set")
        return NextResponse.json({
            error:"No stripe secret webhook"
        },{
            status:500
        })
    }

    let event:Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig , webhookSecret)
    } catch (error) {
        console.error("WEBHOOK signature verfication failed")
        return NextResponse.json({
            error : `webhook error:${error}`
        },
    {
        status:401
    })
    }
    if(event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session;
        const invoice = session.invoice ? await stripe.invoices.retrieve(session.invoice as string):null;
        try {
            await createOrderInsanity(session, invoice);

        } catch (error) {
            console.error('Error creating order in Sanity :', error)
            return NextResponse.json({
                error: `Error creating order in Sanity : ${error}`
            },{status:400})
        }
    }
    return NextResponse.json({received: true})
}

async function createOrderInsanity(session: Stripe.Checkout.Session, invoice: Stripe.Invoice|null){
    const {id,
        amount_total,
        metadata,
        currency,
        payment_intent,
        total_details} = session;
        const {
            orderNumber,
            customerName,
            customerEmail,
            clerkUserId
        } = metadata as unknown as Metadata
         const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {expand:['data.price.product']})

        //creating sanity product reference
        const sanityProducts = lineItemsWithProduct.data.map((item) => ({
            _key: crypto.randomUUID(),
            product: {
                _type: "reference",
                _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
            },
            quantity: item.quantity || 0
        }));

        const order = await backendClient.create({
            _type:'order',
            orderNumber,
            stripeCheckoutSessionId:id,
            stripePaymentIntentId:payment_intent,
            customerName,
            stripeCustomerId:customerEmail,
            clerkUserId,
            email:customerEmail,
            currency,
            amountDiscount:total_details?.amount_discount ? total_details.amount_discount : 0,
            products:sanityProducts,
            totalPrice:amount_total? amount_total:0,
            status:'paid',
            orderDate:new Date().toISOString(),
            invoice:invoice ? {id:invoice.id, number:invoice.number , hosted_invoice_url:invoice.hosted_invoice_url} : null,

        })
        return order
}