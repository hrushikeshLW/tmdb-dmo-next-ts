'use client';
import { useEffect, useState } from "react";
import ".././globals.css";
import AppHeader from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null
  return (
    <div>
      <AppHeader />
      <div id="breadcrumbs" className="breadcrumbs"></div>
      <div className="layout-content-wrapper">
        {children}
      </div>
    </div>
  );
}
