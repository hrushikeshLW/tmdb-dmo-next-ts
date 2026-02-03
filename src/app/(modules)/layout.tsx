import ".././globals.css";
import AppHeader from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
