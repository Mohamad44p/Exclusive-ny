import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/CheckoutForm";
import { unstable_noStore as noStore } from "next/cache";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  noStore();
  const product = await db.product.findUnique({
    where: { id },
  });
  if (product === null) {
    return notFound();
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price,
    currency: "USD",
    metadata: {
      productId: product.id,
    },
  });

  if (paymentIntent.client_secret === null) {
    throw new Error("Failed to create payment intent");
  }
  return (
    <div>
      <CheckoutForm
        product={product as any}
        clientSecret={paymentIntent.client_secret}
      />
    </div>
  );
}
