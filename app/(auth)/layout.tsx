import React from "react";
import "@/globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-gray-100">{children}</div>
      <Footer />
    </>
  );
}
