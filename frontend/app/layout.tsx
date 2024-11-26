"use client";
import React, { useEffect } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import { usePathname, useRouter } from "next/navigation";
import AppProvider from "providers/provider";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = null;
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

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
