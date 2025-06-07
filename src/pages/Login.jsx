import React, { useState } from "react";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { ThemeProvider } from "../context/ThemeContext";
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
  const { t } = useLanguage();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const onFormFinish = async (values) => {
    setLoading(true);
    try {
      if (isLogin) {
        await login(values.email, values.password);
        message.success(t("loginSuccess"));
      } else {
        await signup(values.name, values.email, values.password);
        message.success(t("signupSuccess"));
      }
    } catch (err) {
      message.error(
        t(isLogin ? "loginFailed" : "signupFailed") + ": " + err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const onFormFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ThemeProvider>
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // Tinh chỉnh gradient nền: dùng màu sâu hơn, mượt mà hơn
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8"
      >
        <AntdCard
          // Cải thiện shadow, border và bo góc cho card
          className="max-w-md w-full p-8 shadow-2xl rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-850"
          bodyStyle={{ padding: 0 }} // Xóa padding mặc định của Card body để kiểm soát bằng className
        >
          <div className="text-center mb-8">
            <Title
              level={2}
              className="!text-3xl !font-extrabold text-gray-900 dark:text-white"
            >
              {isLogin ? t("login") : t("signUp")}
            </Title>
            <Text className="!text-base text-gray-500 dark:text-gray-400">
              {t("loginSubtitle")}
            </Text>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 font-medium">
              {t(error)}
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
                // Sử dụng span với Tailwind classes cho label
                label={
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {t("name")}
                  </span>
                }
                name="name"
                rules={[{ required: true, message: t("pleaseInputName") }]}
              >
                <Input
                  placeholder={t("namePlaceholder")}
                  size="large"
                  prefix={
                    <UserOutlined className="site-form-item-icon text-gray-400" />
                  }
                  // Thêm class cho input để điều chỉnh border/shadow khi focus
                  className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </Form.Item>
            )}

            <Form.Item
              label={
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {t("email")}
                </span>
              }
              name="email"
              rules={[
                { required: true, message: t("pleaseInputEmail") },
                { type: "email", message: t("invalidEmail") },
              ]}
            >
              <Input
                type="email"
                placeholder={t("emailPlaceholder")}
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
                  {t("password")}
                </span>
              }
              name="password"
              rules={[
                { required: true, message: t("pleaseInputPassword") },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || isLogin || value.length >= 6) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t("passwordMinLength")));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={t("passwordPlaceholder")}
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
                    {t("confirmPassword")}
                  </span>
                }
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: t("pleaseConfirmPassword") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(t("passwordsDoNotMatch")),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder={t("confirmPasswordPlaceholder")}
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
                {isLogin ? t("login") : t("signUp")}
              </Button>
            </Form.Item>

            <div className="text-center mt-6">
              <Text className="text-base text-gray-600 dark:text-gray-400">
                {isLogin ? t("noAccount") : t("haveAccount")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    form.resetFields();
                  }}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
                >
                  {isLogin ? t("signUp") : t("login")}
                </button>
              </Text>
            </div>
          </Form>
        </AntdCard>
      </Motion.div>
    </ThemeProvider>
  );
};

export default AuthForm;
