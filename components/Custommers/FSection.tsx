"use client";

import iconDelivery from "../../public/images/icon-delivery.png";
import IconCustomerservice from "../../public/images/Icon-Customerservice.png";
import IconSecure from "../../public/images/Icon-secure.png";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FSection() {
  useGSAP(() => {
    const elements = ["#tit", "#des", "#icon"];
    elements.forEach((element, index) => {
      gsap.from(element, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5 + index * 0.2,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 10%",
          toggleActions: "play none none none",
        },
        ease: "power4.out",
      });
    });
  }, []);
  return (
    <section className="flex items-center justify-center gap-x-20">
      <div>
        <div className="flex flex-col items-center gap-y-5 my-28">
          <div className="bg-black p-5 dark:bg-orange-400  rounded-full">
            <Image
              src={iconDelivery}
              alt="icon"
              width={30}
              height={30}
              id="icon"
            />
          </div>
          <h3 className="text-2xl font-semibold" id="tit">
            FREE AND FAST DELIVERY
          </h3>
          <p className="text-center text-muted-foreground" id="des">
            Free delivery for all orders over $140
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center gap-y-5 my-28">
          <div className="bg-black p-5 dark:bg-orange-400  rounded-full">
            <Image
              src={IconCustomerservice}
              alt="icon"
              width={30}
              height={30}
              id="icon"
            />
          </div>
          <h3 className="text-2xl font-semibold" id="tit">
            24/7 CUSTOMER SERVICE
          </h3>
          <p className="text-center text-muted-foreground" id="des">
            Friendly 24/7 customer support
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center gap-y-5 my-28">
          <div className="bg-black p-5 dark:bg-orange-400  rounded-full">
            <Image
              src={IconSecure}
              alt="icon"
              width={30}
              height={30}
              id="icon"
            />
          </div>
          <h3 className="text-2xl font-semibold" id="tit">
            MONEY BACK GUARANTEE
          </h3>
          <p className="text-center text-muted-foreground" id="des">
            We reurn money within 30 days
          </p>
        </div>
      </div>
    </section>
  );
}
