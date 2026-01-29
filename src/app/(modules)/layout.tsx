import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ".././globals.css";
import { Breadcrumb } from "antd";
import AppHeader from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppHeader />
      <Breadcrumb
        style={{ margin: "16px 0", background: "#fff", padding: "8px" }}
        items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
      />
      <div
        style={{
          padding: 24,
          minHeight: 380,
        }}
      >
        {children}
      </div>
    </div>
  );
}
