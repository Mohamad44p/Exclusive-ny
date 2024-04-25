import BrowseByCategory from "@/components/Custommers/BrowseByCategory";
import Hero from "@/components/Custommers/Hero";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <Hero />
      <BrowseByCategory/>
    </main>
  );
}
