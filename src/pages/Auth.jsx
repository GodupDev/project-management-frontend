import React, { useState } from "react";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
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
  const { t } = useLanguage();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const onFormFinish = async (values) => {
    setLoading(true);
    try {
      if (isLogin) {
        console.log(
          "Đang thực hiện đăng nhập với:",
          values.email,
          values.password,
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        message.success(t("loginSuccess"));
      } else {
        console.log(
          "Đang thực hiện đăng ký với:",
          values.name,
          values.email,
          values.password,
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        message.success(t("signupSuccess"));
      }
    } catch (err) {
      message.error(
        t(isLogin ? "loginFailed" : "signupFailed") +
          ": " +
          (err.message || t("unknownError")),
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
        // PROFESSIONAL COLOR CHANGES START HERE
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:to-gray-900 px-4"
        // PROFESSIONAL COLOR CHANGES END HERE
      >
        <AntdCard className="max-w-md w-full p-6 shadow-lg rounded-lg">
          <div className="text-center mb-6">
            <Title level={2}>{isLogin ? t("login") : t("signUp")}</Title>
            <Text style={{ fontSize: "14px" }}>{t("loginSubtitle")}</Text>
          </div>

          <Form
            form={form}
            onFinish={onFormFinish}
            onFinishFailed={onFormFinishFailed}
            layout="vertical"
          >
            {!isLogin && (
              <Form.Item
                label={t("name")}
                name="name"
                rules={[{ required: true, message: t("pleaseInputName") }]}
              >
                <Input
                  placeholder={t("namePlaceholder")}
                  size="large"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            )}

            <Form.Item
              label={t("email")}
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
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Form.Item
              label={t("password")}
              name="password"
              rules={[{ required: true, message: t("pleaseInputPassword") }]}
            >
              <Input.Password
                placeholder={t("passwordPlaceholder")}
                size="large"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            {!isLogin && (
              <Form.Item
                label={t("confirmPassword")}
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
                  prefix={<LockOutlined />}
                />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full"
                loading={loading}
              >
                {isLogin ? t("login") : t("signUp")}
              </Button>
            </Form.Item>

            <div className="text-center mt-4">
              <Text style={{ fontSize: "14px" }}>
                {isLogin ? t("noAccount") : t("haveAccount")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    form.resetFields();
                  }}
                  // PROFESSIONAL COLOR CHANGES START HERE
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  // PROFESSIONAL COLOR CHANGES END HERE
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
