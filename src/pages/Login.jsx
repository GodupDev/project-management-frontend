import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useLanguage();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/");
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <div className="text-center mb-8">
            <Typography.Title level={2} className="text-gray-900">
              {t("projectManagement")}
            </Typography.Title>
            <Typography.Text className="text-gray-500">
              {t("signInToAccount")}
            </Typography.Text>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: t("pleaseInputEmail") },
                { type: "email", message: t("pleaseEnterValidEmail") },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder={t("email")}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: t("pleaseInputPassword") }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder={t("password")}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                {t("signIn")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Motion.div>
  );
};

export default Login;
