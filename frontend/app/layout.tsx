"use client";
import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import AppProvider from "providers/AppProvider";
import UserProvider from "providers/UserProvider";

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
          <UserProvider>
          {!isLoginPage && <Navbar />}
          <main>{children}</main>
          </UserProvider>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
