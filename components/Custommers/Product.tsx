import db from "@/db/db";
import type { Product } from "@prisma/client";
import Image from "next/image";

async function getProducts() {
  const product = await db.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imagePath: true,
    },
  });
}

const Product = ({ product }: { product: Product }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={product.imagePath || "/product-placeholder.png"}
          alt="product image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.name}</h3>
        </div>

        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
};

export default Product;
