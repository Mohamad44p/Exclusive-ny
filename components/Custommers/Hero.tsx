"use client";

import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/images/HeroImage.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";

export default function Hero() {
  useGSAP(() => {
    gsap.fromTo(
      "#hero",
      {
        x: -300,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power4.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      "#subtitle",
      {
        y: 300,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "power4.out",
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      ".link",
      {
        opacity: 0,
        y: 400,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.5,
        delay: 1.5,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      "#hero-image",
      {
        x: 600,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "power3.inOut",
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power3.inOut",
      }
    );
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            id="hero-image"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            src={HeroImage}
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1
                id="hero"
                className="opacity-0 text-3xl font-Garamond font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              >
                Embrace the Season in Style
              </h1>
              <p
                id="subtitle"
                className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                Discover our latest Spring Collection, crafted with care to
                elevate your wardrobe.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 opacity-0 link"
                href="/products"
              >
                Shop Now
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 opacity-0 link"
                href="/products"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
