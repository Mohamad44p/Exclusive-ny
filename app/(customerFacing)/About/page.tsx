"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { useSpring } from "framer-motion";
import Gallery from "@/components/About/gallery";
import Description from "@/components/About/description";

const projects = [
  {
    name: "Mohammad Abu Omar",
    handle: "dyal_thak",
  },
  {
    name: "Exclusive Eecomerce ",
    handle: "leidinger_matthias",
  },
  {
    name: "Build With Next-js",
    handle: "mark_rammers",
  },
  {
    name: "Thank you For Visiting",
    handle: "landon_speers",
  },
];

const text = [
  "Welcome to About Page of Exclusive Eecomerce",
  "Contact us Email:@mohamad44p@yahoo.com",
  "This Project is Build With Next-js",
  "I hope you like it",
];
export default function Home() {
  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const mouseMove = (e: { clientX: any; clientY: any }) => {
    const { clientX, clientY } = e;
    const targetX = clientX - (window.innerWidth / 2) * 0.25;
    const targetY = clientY - (window.innerWidth / 2) * 0.3;
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  return (
    <main onMouseMove={mouseMove}>
      {projects.map(({ handle }, i) => {
        return (
          <Gallery
            text={text[i]}
            mousePosition={mousePosition}
            handle={handle}
            key={i}
          />
        );
      })}
      <Description mousePosition={mousePosition} projects={projects} />
    </main>
  );
}
