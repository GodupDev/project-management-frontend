import React, { useState, useEffect } from "react";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import { ThemeProvider } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu đã đăng nhập, chuyển hướng về trang chủ
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onFormFinish = async (values) => {
    try {
      if (isLogin) {
        await login(values.email, values.password);
      } else {
        const res = await signup(
          values.email,
          values.password,
          values.username,
        );
        if (res) setIsLogin(!isLogin);
      }
    } catch (err) {
      // Lỗi đã được xử lý trong AuthContext
      console.error(err);
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
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:to-gray-900 px-4"
      >
        <AntdCard className="max-w-md w-full p-6 shadow-lg rounded-lg">
          <div className="text-center mb-6">
            <Title level={2}>{isLogin ? "Đăng nhập" : "Đăng ký"}</Title>
            <Text style={{ fontSize: "14px" }}>
              {isLogin
                ? "Đăng nhập vào tài khoản của bạn"
                : "Tạo tài khoản mới"}
            </Text>
          </div>

          <Form
            form={form}
            onFinish={onFormFinish}
            onFinishFailed={onFormFinishFailed}
            layout="vertical"
          >
            {!isLogin && (
              <Form.Item
                label="Tên người dùng"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên người dùng" },
                  { min: 3, message: "Tên người dùng phải có ít nhất 3 ký tự" },
                ]}
              >
                <Input
                  placeholder="Tên người dùng của bạn"
                  size="large"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            )}

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input
                type="email"
                placeholder="example@example.com"
                size="large"
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                size="large"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            {!isLogin && (
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Xác nhận mật khẩu"
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
                {isLogin ? "Đăng nhập" : "Đăng ký"}
              </Button>
            </Form.Item>

            <div className="text-center mt-4">
              <Text style={{ fontSize: "14px" }}>
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    form.resetFields();
                  }}
                  className="!text-[#4096ff] hover:text-indigo-800 !font-bold"
                >
                  {isLogin ? "Đăng ký" : "Đăng nhập"}
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
