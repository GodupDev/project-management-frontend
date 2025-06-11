import React from "react";
import { Card, Select, Radio, Space, Typography, Divider } from "antd";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { motion as Motion } from "framer-motion";

const { Title } = Typography;
const { Option } = Select;

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, language, changeLanguage } = useLanguage();

  const handleThemeChange = (value) => {
    if (value === "light" || value === "dark") {
      toggleTheme();
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card title={t("appearance")} className="mb-4">
        <div className="p-5 space-y-8">
          {/* Theme */}
          <div>
            <Title level={5}>{t("settingsTheme")}</Title>
            <Radio.Group
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="!mt-2"
            >
              <Space direction="vertical">
                <Radio value="light">{t("settingsLight")}</Radio>
                <Radio value="dark">{t("settingsDark")}</Radio>
              </Space>
            </Radio.Group>
          </div>

          <Divider />

          {/* Language */}
          <div>
            <Title level={5}>{t("settingsLanguage")}</Title>
            <Select
              value={language}
              onChange={(value) => changeLanguage(value)}
              className="w-full !mt-2"
            >
              <Option value="en">English</Option>
              <Option value="vi">Tiếng Việt</Option>
            </Select>
          </div>
        </div>
      </Card>
    </Motion.div>
  );
};

export default AppearanceSettings;
