"use client";
import { TOKEN } from "@/common/constant";
import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AppHeader = () => {
  const router = useRouter();
  const token = Cookies.get(TOKEN);
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
        {!token ? (
          <Button type="primary" href="/auth/login">
            Login
          </Button>
        ) : (
          <div>
            <Button type="primary" onClick={() => {
              Cookies.remove(TOKEN);
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
