"use client";
import { useMutation } from "@apollo/client/react";
import { Button, Card, Flex, Form, Input } from "antd";
import React from "react";
import { LOGIN } from "./graphql/Mutation";
import { TOKEN, USER } from "@/common/constant";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type formProps = {
  email: string;
  password: string;
};
const Login = () => {
  const router = useRouter();
  const [emailPasswordLogIn, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      Cookies.set(TOKEN, data?.emailPasswordLogIn?.data?.token || "");
      Cookies.set(
        USER,
        JSON.stringify(data?.emailPasswordLogIn?.data?.user),
      );
      router.push("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
  const onFinish = (values: formProps) => {
    console.log("Success:", values);
    emailPasswordLogIn({ variables: { data: values } });
  };
  return (
    <Flex className="login-page" align="center" justify="center">
      <Card className="login-card" title="Log in">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              disabled={loading}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card></Flex>
  );
};

export default Login;
