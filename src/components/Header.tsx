"use client";
import { TOKEN, USER } from "@/common/constant";
import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useSession, signOut } from "next-auth/react";

const AppHeader = () => {
  const router = useRouter();
  const token = Cookies.get(TOKEN);
  const { data: session } = useSession();
  const isAuthenticated = !!session || !!token;
  const pathname = usePathname();
  return (
    <Header className="main-header">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["/"]}
        selectedKeys={
          pathname?.split("/")?.[1] ? [pathname?.split("/")?.[1]] : []
        }
        items={[
          {
            key: "home",
            label: "Home",
          },
          { key: "movies-card", label: "Movies" },
          { key: "person-list", label: "Person" },
        ]}
        className="header-menu"
        onClick={(e) => {
          router.push(`/${e.key}`);
        }}
      />
      <div>
        {!isAuthenticated ? (
          <Button type="primary" href="/auth/login">
            Login
          </Button>
        ) : (
          <div>
            <Button type="primary" onClick={async () => {
              Cookies.remove(TOKEN);
              Cookies.remove(USER);
              await signOut({ redirect: false });
              router.push("/auth/login");
            }}>
              Logout
            </Button></div>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
