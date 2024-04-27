import CusNavbar from "@/components/Custommers/CusNavbar";
import Footer from "@/components/Custommers/Footer";
import React from "react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CusNavbar />
      <main className="container my-6">{children}</main>
      <Footer />
    </>
  );
}
