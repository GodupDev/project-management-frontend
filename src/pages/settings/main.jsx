import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  BellOutlined,
  EyeOutlined,
  GlobalOutlined,
  LockOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import MyProfile from "./MyProfile";
import NotificationSettings from "./NotificationSettings";
import AppearanceSettings from "./AppearanceSettings";
import PrivacySettings from "./PrivacySettings";
import TimeZoneSettings from "./TimeZoneSettings";
import SecuritySettings from "./SecuritySettings";

const { Content, Sider } = Layout;

const menuItems = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "My Profile",
  },
  {
    key: "notifications",
    icon: <BellOutlined />,
    label: "Notifications",
  },
  {
    key: "appearance",
    icon: <SettingOutlined />,
    label: "Appearance",
  },
  {
    key: "privacy",
    icon: <EyeOutlined />,
    label: "Privacy",
  },
  {
    key: "timezone",
    icon: <GlobalOutlined />,
    label: "Time Zone",
  },
  {
    key: "security",
    icon: <LockOutlined />,
    label: "Security",
  },
];

const routes = [
  { path: "profile", element: <MyProfile /> },
  { path: "notifications", element: <NotificationSettings /> },
  { path: "appearance", element: <AppearanceSettings /> },
  { path: "privacy", element: <PrivacySettings /> },
  { path: "timezone", element: <TimeZoneSettings /> },
  { path: "security", element: <SecuritySettings /> },
];

const SettingsMain = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split("/").filter(Boolean);
  // pathParts[0] = 'settings', pathParts[1] = 'profile' | 'notifications' | ...
  const selectedKey = pathParts[1] || "profile";

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Layout className="min-h-[100vh] p-4">
        <Sider
          width={250}
          className="bg-white border-r rounded-md border-gray-200"
          theme="light"
        >
          <div className="p-4">
            <h1 className="text-xl font-semibold text-gray-800">Settings</h1>
          </div>
          <Menu
            mode="inline"
            items={menuItems}
            className="rounded-md"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => navigate(`/settings/${key}`)}
          />
        </Sider>
        <Content className="p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route index element={<Navigate to="profile" replace />} />
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Motion.div>
  );
};

export default SettingsMain;
