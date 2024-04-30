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
          toggleActions: "play reverse reverse reverse",
        },
        ease: "power4.out",
      });
    });
  }, []);
  return (
    <section className="flex items-center justify-center gap-x-20">
      <div>
        <SecShort
          title="FREE AND FAST DELIVERY"
          icon={iconDelivery}
          desc="Free delivery for all orders over $140"
        />
      </div>
      <div>
        <SecShort
          title="24/7 CUSTOMER SERVICE"
          icon={IconCustomerservice}
          desc="Friendly 24/7 customer support"
        />
      </div>
      <div>
        <SecShort
          title="MONEY BACK GUARANTEE"
          icon={IconSecure}
          desc="We reurn money within 30 days"
        />
      </div>
    </section>
  );
}

function SecShort({
  icon,
  title,
  desc,
}: {
  icon: StaticImageData;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-y-5 my-28">
      <div className="bg-black p-5 dark:bg-orange-400  rounded-full">
        <Image src={icon} alt="icon" width={30} height={30} id="icon" />
      </div>
      <h3 className="text-2xl font-semibold" id="tit">{title}</h3>
      <p className="text-center text-muted-foreground" id="des">{desc}</p>
    </div>
  );
}
