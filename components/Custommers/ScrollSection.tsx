"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

function ScrollSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );

    gsap.fromTo(
      "#Arrow",
      {
        y: -10,
      },
      {
        y: 10,
        duration: 1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      }
    );
    gsap.fromTo(
      "#Header",
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="scroll-section-outer">
      <h1 className="text-3xl font-bold flex items-center gap-x-2 " id="Header">
        Whats so special about our store{" "}
        <ArrowDown
          className="w-10 h-10 bg-orange-400 rounded-full"
          id="Arrow"
        />
      </h1>
      <div ref={triggerRef}>
        <div ref={sectionRef} className="scroll-section-inner">
          <div className="scroll-section">
            <CardSection
              title="Always new Products"
              description="Discover the latest arrivals and stay ahead of the trend with our constantly updated selection."
              imageSrc="/images/product2image.jpg"
              imageAlt="HeroImageForScrollSection"
            />
          </div>
          <div className="scroll-section">
            <CardSection
              title="Versatility in products"
              description="Find exactly what you're looking for among our diverse range of products tailored to suit various needs and preferences."
              imageSrc="/images/product6image.jpg"
              imageAlt="SecImageForScrollSection"
            />
          </div>
          <div className="scroll-section">
            <CardSection
              title="The price is suitable for everyone"
              description=" Experience affordability without compromising on quality. Our competitive prices ensure that there's something for every budget."
              imageSrc="/images/product4image.jpg"
              imageAlt="TheImageForScrollSection"
            />
          </div>
          <div className="scroll-section">
            <CardSection
              title="Here's everything you need in one Place"
              description="Convenience meets choice as we bring together all your essentials under one roof. Say goodbye to hopping between stores."
              imageSrc="/images/product1image.jpg"
              imageAlt="ForImageForScrollSection"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollSection;

function CardSection({
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-muted-foreground font-semibold">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={imageSrc} alt={imageAlt} width={600} height={400} />
      </CardContent>
    </Card>
  );
}