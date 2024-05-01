import db from "@/db/db";
import Link from "next/link";
import {
  Baby,
  BookmarkIcon,
  Cable,
  GamepadIcon,
  HeadphonesIcon,
  HeartPulse,
  Home,
  PercentSquare,
  PersonStanding,
  Shirt,
} from "lucide-react";
import BrByCategoryTitles from "./BrByCategoryTitles";

async function getCategories() {
  const data = await db.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  return data;
}

export default async function BrowseByCategory() {
  const data = await getCategories();

  const icons = [
    <BookmarkIcon key="bookmark" className="h-6 w-6 text-white" />,
    <PersonStanding key="camera" className="h-6 w-6 text-white" />,
    <Cable key="chevron-left" className="h-6 w-6 text-white" />,
    <Home key="chevron-right" className="h-6 w-6 text-white" />,
    <GamepadIcon key="gamepad" className="h-6 w-6 text-white" />,
    <HeadphonesIcon key="headphones" className="h-6 w-6 text-white" />,
    <Baby key="baby" className="h-6 w-6 text-white" />,
    <PercentSquare key="percent" className="h-6 w-6 text-white" />,
    <HeartPulse key="heart" className="h-6 w-6 text-white" />,
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32  font-Franklin">
      <div className="container px-4 md:px-6">
        <BrByCategoryTitles />
        <div className="mx-auto mt-8 grid max-w-5xl items-start gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((category, index) => (
            <div
              key={category.id}
              className="relative group overflow-hidden rounded-lg"
            >
              <Link
                className="absolute inset-0 z-10"
                href={`/category/${category.id}`}
              >
                <span className="sr-only">View</span>
              </Link>
              <div className="bg-[#000] rounded-lg w-full h-[3rem] mx-auto flex justify-center items-center">
                {icons[index] ? (
                  icons[index]
                ) : (
                  <BookmarkIcon className="h-6 w-6 text-white" />
                )}
              </div>
              <div className=" p-4">
                <h3 className="font-semibold text-lg md:text-xl">
                  {category.name}
                </h3>
                <p className="text-sm">{category.description}</p>
                <Link className="underline py-2" href="/products">
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
