import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import OrderInformation from "@/email/_components/OrderInformation";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );
  if (paymentIntent.metadata.productId == null) return notFound();

  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  });
  if (product == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";
  await createOrder(product.id, product.price);

  if (isSuccess) {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      const order = await db.order.findFirst({
        where: { userId: user?.id },
        orderBy: { createdAt: "desc" },
      });

      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user?.email ?? "User Email",
        subject: "Order Information",
        react: OrderInformation({
          order: {
            id: order?.id ?? "",
            createdAt: order?.createdAt ?? new Date(),
            pricePaid: order?.pricePaid ?? 0,
          },
          product: {
            name: product?.name ?? "Product Name",
            description: product?.description ?? "Product Description",
            imagePath: product?.imagePath ?? "Product Image Path",
          },
        }),
      });

      console.log("Email sent successfully:", data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 h-[50vh] w-1/3 relative">
          <Image
            src={product.imagePath ?? "/placeholder.jpg"}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">{product.price}</div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
          <Button className="mt-4" size="lg" asChild>
            {isSuccess ? (
              <a href={`https://exclusive-ny.vercel.app/orders`}>My Orders</a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

async function createOrder(productId: string, pricePaid: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return await db.order.create({
    data: {
      productId,
      userId: user?.id || "",
      pricePaid,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}
