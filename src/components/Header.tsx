"use client";
import { TOKEN } from "@/common/constant";
import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const AppHeader = () => {
  const router = useRouter();
  const token = localStorage?.getItem(TOKEN);
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
          <Button type="primary" onClick={() => localStorage.clear()}>
            Logout
          </Button>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
