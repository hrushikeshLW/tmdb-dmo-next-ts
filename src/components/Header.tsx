"use client";
import { TOKEN } from "@/common/constant";
import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { start } from "repl";

const AppHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = localStorage.getItem(TOKEN);
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        // selectedKeys={[start]}
        items={[
          {
            key: "/",
            label: "Home",
          },
          { key: "/movies-card", label: "Movies" },
          { key: "/person-list", label: "Person" },
        ]}
        style={{ flex: 1, minWidth: 0 }}
        onClick={(e) => {
          router.push(`${e.key}`);
        }}
      />
      {!token ? (
        <Button type="primary" href="/auth/login">
          Login
        </Button>
      ) : (
        <Button type="primary" onClick={() => localStorage.clear()}>
          Logout
        </Button>
      )}
    </Header>
  );
};

export default AppHeader;
