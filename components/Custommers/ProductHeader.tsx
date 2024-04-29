"use client";

import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";

export default function ProductHeader() {
  useGSAP(() => {
    gsap.fromTo(
      "#heder",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power2.inOut" }
    );

    gsap.fromTo(
      "#subhed",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, delay: 1, ease: "power2.inOut" }
    );
  });

  return (
    <div className="my-20">
      <h1 id="heder" className="text-3xl font-bold">
        All Products
      </h1>
      <p id="subhed" className="text-muted-foreground text-sm">
        A collection of products available for purchase
      </p>
    </div>
  );
}
