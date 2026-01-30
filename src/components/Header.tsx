"use client";
import { TOKEN } from "@/common/constant";
import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import React from "react";

const AppHeader = () => {
  const router = useRouter();
  const token = window?.localStorage?.getItem(TOKEN);
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
        defaultSelectedKeys={["/"]}
        // selectedKeys={[start]}
        items={[
          {
            key: "/home",
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
