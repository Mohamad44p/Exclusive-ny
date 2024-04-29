import EmptyState from "@/components/Custommers/EmptyState";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/Custommers/ProductCard";
import ProductHeader from "@/components/Custommers/ProductHeader";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Suspense } from "react";

const getProducts = () => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
};

export default function ProductsPage() {
  return (
    <div>
      <ProductHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();

  if (!products) {
    return (
      <>
        <EmptyState />
      </>
    );
  }
  return products.map((product) => (
    <>
      <ProductCard key={product.id} {...product} />
    </>
  ));
}