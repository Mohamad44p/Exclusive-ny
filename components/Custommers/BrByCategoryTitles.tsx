"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function BrByCategoryTitles() {
  useGSAP(() => {
    const elements = ["#cst", "#cbt", "#cdt"];

    elements.forEach((element, index) => {
      gsap.from(element, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5 + index * 0.2,
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none none",
        },
        ease: "power4.out",
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div id="cst" className="inline-block rounded-lg px-3 py-1 text-sm ">
          Browse By Category
        </div>
        <h2
          id="cbt"
          className="text-3xl font-bold tracking-tighter sm:text-5xl "
        >
          Discover Your Style
        </h2>
        <p
          id="cdt"
          className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed "
        >
          Explore our wide range of categories to find the perfect fit for your
          wardrobe.
        </p>
      </div>
    </div>
  );
}
