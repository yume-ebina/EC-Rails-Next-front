import React from "react";
import "@/globals.css";

import Footer from "@/components/Footer";
import { AuthProvider } from "../contexts/AuthContext";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <div>{children}</div>
        <Footer />
      </AuthProvider>
    </>
  );
}
