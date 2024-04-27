"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  imagePath: string | null;
};

export function ProductCard({
  id,
  name,
  price,
  description,
  imagePath,
}: ProductCardProps) {
  useGSAP(() => {
    gsap.fromTo(
      ".staggerCards",
      {
        opacity: 0,
        x: -300,
        repeat: -1,
        yoyo: true,
        duration: 1,

        stagger: {
          amount: 2,
          grid: [1, 3],
          axis: "x",
          ease: "power1.inOut",
          from: "start",
        },
        scrollTrigger: {
          trigger: ".staggerCards",
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none none",
        },
      },
      {
        opacity: 1,
        x: 0,
        repeat: 0,
        yoyo: true,
        duration: 1,

        stagger: {
          amount: 2,
          grid: [1, 6],
          axis: "x",
          ease: "power1.inOut",
          from: "start",
        },

        scrollTrigger: {
          trigger: ".staggerCards",
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <Card className="flex overflow-hidden flex-col staggerCards opacity-0">
      <div className="relative w-full aspect-video">
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <Image
            src={imagePath || "/product-image-placeholder.svg"}
            alt={name}
            width={500}
            height={500}
            objectFit="contain"
          />
        </CardContent>
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>${price}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
