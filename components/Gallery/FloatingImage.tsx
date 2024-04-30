"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import { MouseEvent, useRef } from "react";
import gsap from "gsap";
import {
  floating1,
  floating2,
  floating3,
  floating4,
  floating5,
  floating6,
  floating7,
  floating8,
} from "./data";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FloatingImage() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId: number | null = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e: MouseEvent<HTMLElement, MouseEvent>) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start: number, target: number, amount: number) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });
    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId as number);
      requestAnimationFrameId = null;
    }
  };

  return (
    <main
      onMouseMove={(e: any) => {
        manageMouseMove(e);
      }}
      className={styles.main}
    >
      <div ref={plane1} className={styles.plane}>
        <Image src={floating1} alt="image" width={300} />
        <Image src={floating2} alt="image" width={300} />
        <Image src={floating7} alt="image" width={225} />
      </div>
      <div ref={plane2} className={styles.plane}>
        <Image src={floating4} alt="image" width={250} />
        <Image src={floating6} alt="image" width={200} />
        <Image src={floating8} alt="image" width={225} />
      </div>
      <div ref={plane3} className={styles.plane}>
        <Image src={floating3} alt="image" width={150} />
        <Image src={floating5} alt="image" width={200} />
      </div>
      <div className={styles.title}>
        <h1 className="font-bold text-3xl">Explore Our Product</h1>
        <Button variant="default" className="mt-10" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
