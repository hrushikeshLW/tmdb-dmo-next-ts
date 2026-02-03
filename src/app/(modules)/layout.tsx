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
      <div
        style={{
          padding: "0px 24px",
          minHeight: 380,
        }}
      >
        {children}
      </div>
    </div>
  );
}
