import React from "react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container my-6">{children}</main>
    </>
  );
}