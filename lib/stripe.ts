import Stripe from "stripe"

if(!process.env.STRIPE_SECRET_KEY ){
    throw new Error("Missing STRIPE_SECRET_KEY environment variable")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion:"2025-02-24.acacia",
});

export default stripe;
