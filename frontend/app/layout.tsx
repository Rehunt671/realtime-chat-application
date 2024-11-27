"use client";
import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import AppProvider from "providers/provider";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body>
        <AppProvider>
          {!isLoginPage && <Navbar />}
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
