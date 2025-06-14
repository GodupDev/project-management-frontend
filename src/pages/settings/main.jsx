import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import {
  UserOutlined,
  BellOutlined,
  EyeOutlined,
  GlobalOutlined,
  LockOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import MyProfile from "./MyProfile";
import NotificationSettings from "./NotificationSettings";
import AppearanceSettings from "./AppearanceSettings";
import PrivacySettings from "./PrivacySettings";
import SecuritySettings from "./SecuritySettings";

const { Content, Sider } = Layout;

// Styled Components
const StyledLayout = styled(Layout)`
  min-height: 75vh;
  padding: 1rem;
  background: transparent;
`;

const StyledSider = styled(Sider)`
  background: white;
  border-right: 1px solid #f0f0f0;
  border-radius: 8px;
`;

const StyledMenu = styled(Menu)`
  border-radius: 8px;
`;

const SettingsMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const selectedKey = pathParts[1] || "profile";

  const menuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: t("myProfile"),
    },
    {
      key: "notifications",
      icon: <BellOutlined />,
      label: t("notifications"),
    },
    {
      key: "appearance",
      icon: <SettingOutlined />,
      label: t("appearance"),
    },
    {
      key: "privacy",
      icon: <EyeOutlined />,
      label: t("privacy"),
    },
    {
      key: "security",
      icon: <LockOutlined />,
      label: t("security"),
    },
  ];

  const routes = [
    { path: "profile", element: <MyProfile /> },
    { path: "notifications", element: <NotificationSettings /> },
    { path: "appearance", element: <AppearanceSettings /> },
    { path: "privacy", element: <PrivacySettings /> },
    { path: "security", element: <SecuritySettings /> },
  ];

  return (
    <Motion.div
      className="p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledLayout>
        <StyledSider width={250}>
          <div className="p-4">
            <h1 className="text-xl font-semibold">{t("settings")}</h1>
          </div>
          <StyledMenu
            mode="inline"
            items={menuItems}
            selectedKeys={[selectedKey]}
            onClick={({ key }) => navigate(`/settings/${key}`)}
          />
        </StyledSider>
        <Content className="p-6 ">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route index element={<Navigate to="profile" replace />} />
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </div>
        </Content>
      </StyledLayout>
    </Motion.div>
  );
};

export default SettingsMain;
