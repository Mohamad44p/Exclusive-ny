import Image from "next/image";
import Link from "next/link";

export default function BrowseByCategory() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 font-Franklin">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Browse By Category
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Discover Your Style
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore our wide range of categories to find the perfect fit for
              your wardrobe.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative group overflow-hidden rounded-lg">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Dresses"
              className="object-cover w-full h-60"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Dresses</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Elegant and stylish dresses for any occasion.
              </p>
              <Link
                className="font-semibold underline underline-offset-4"
                href="#"
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Tops"
              className="object-cover w-full h-60"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Tops</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Stylish and versatile tops for any look.
              </p>
              <Link
                className="font-semibold underline underline-offset-4"
                href="#"
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Accessories"
              className="object-cover w-full h-60"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Accessories</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Complete your look with our stylish accessories.
              </p>
              <Link
                className="font-semibold underline underline-offset-4"
                href="#"
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Shoes"
              className="object-cover w-full h-60"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Shoes</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Step out in style with our fashionable shoes.
              </p>
              <Link
                className="font-semibold underline underline-offset-4"
                href="#"
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Bags"
              className="object-cover w-full h-60"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Bags</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Stylish and functional bags for everyday use.
              </p>
              <Link
                className="font-semibold underline underline-offset-4"
                href="#"
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <Image
              alt="Jewelry"
              className="object-cover w-full h-60"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Jewelry</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
