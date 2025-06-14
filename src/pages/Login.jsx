import React, { useState } from "react";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  Form,
  Input,
  Button,
  Card as AntdCard,
  Typography,
  message,
} from "antd";

const { Title, Text } = Typography;

const AuthForm = () => {
  const { login, signup, error } = useAuth();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const onFormFinish = async (values) => {
    setLoading(true);
    try {
      if (isLogin) {
        await login(values.email, values.password);
        message.success("Login successful!");
      } else {
        await signup(values.name, values.email, values.password);
        message.success("Signup successful!");
      }
    } catch (err) {
      message.error(
        `${isLogin ? "Login failed" : "Signup failed"}: ${err.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const onFormFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8"
    >
      <AntdCard
        className="max-w-md w-full p-8 shadow-2xl rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-850"
        bodyStyle={{ padding: 0 }}
      >
        <div className="text-center mb-8">
          <Title
            level={2}
            className="!text-3xl !font-extrabold text-gray-900 dark:text-white"
          >
            {isLogin ? "Login" : "Sign Up"}
          </Title>
          <Text className="!text-base text-gray-500 dark:text-gray-400">
            Please enter your credentials to continue
          </Text>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 font-medium">
            {error}
          </div>
        )}

        <Form
          form={form}
          onFinish={onFormFinish}
          onFinishFailed={onFormFinishFailed}
          layout="vertical"
          className="space-y-6"
        >
          {!isLogin && (
            <Form.Item
              label={
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Name
                </span>
              }
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                placeholder="Enter your name"
                size="large"
                prefix={
                  <UserOutlined className="site-form-item-icon text-gray-400" />
                }
                className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </Form.Item>
          )}

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Email
              </span>
            }
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email address!" },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              size="large"
              prefix={
                <MailOutlined className="site-form-item-icon text-gray-400" />
              }
              className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Password
              </span>
            }
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || isLogin || value.length >= 6) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Password must be at least 6 characters."),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              size="large"
              prefix={
                <LockOutlined className="site-form-item-icon text-gray-400" />
              }
              className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </Form.Item>

          {!isLogin && (
            <Form.Item
              label={
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Confirm Password
                </span>
              }
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match."));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm your password"
                size="large"
                prefix={
                  <LockOutlined className="site-form-item-icon text-gray-400" />
                }
                className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </Form.Item>
          )}

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full h-12 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-none text-white font-semibold text-lg"
              loading={loading}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form.Item>

          <div className="text-center mt-6">
            <Text className="text-base text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  form.resetFields();
                }}
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </Text>
          </div>
        </Form>
      </AntdCard>
    </Motion.div>
  );
};

export default AuthForm;
