import React from "react";
import { Card, Select, Radio, Space, Typography } from "antd";
import { useMockData } from "../../context/MockDataContext";
import { useLanguage } from "../../context/LanguageContext";
import { motion as Motion } from "framer-motion";

const { Title } = Typography;
const { Option } = Select;

const AppearanceSettings = () => {
  const { settings, updateSettings } = useMockData();
  const { t, language, changeLanguage } = useLanguage();

  const handleChange = (key, value) => {
    if (key === "language") {
      changeLanguage(value);
    }
    updateSettings({
      appearanceSettings: {
        ...settings.appearanceSettings,
        [key]: value,
      },
    });
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card title={t("appearance")} className="mb-4">
        <div className="space-y-6">
          {/* Theme */}
          <div>
            <Title level={5}>{t("theme")}</Title>
            <Radio.Group
              value={settings.appearanceSettings.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              className="mt-4"
            >
              <Space direction="vertical">
                <Radio value="light">{t("light")}</Radio>
                <Radio value="dark">{t("dark")}</Radio>
                <Radio value="system">{t("system")}</Radio>
              </Space>
            </Radio.Group>
          </div>

          {/* Language */}
          <div>
            <Title level={5}>{t("language")}</Title>
            <Select
              value={language}
              onChange={(value) => handleChange("language", value)}
              className="w-full mt-4"
            >
              <Option value="en">English</Option>
              <Option value="vi">Tiếng Việt</Option>
            </Select>
          </div>

          {/* Font Size */}
          <div>
            <Title level={5}>{t("fontSize")}</Title>
            <Radio.Group
              value={settings.appearanceSettings.fontSize}
              onChange={(e) => handleChange("fontSize", e.target.value)}
              className="mt-4"
            >
              <Space direction="vertical">
                <Radio value="small">{t("small")}</Radio>
                <Radio value="medium">{t("medium")}</Radio>
                <Radio value="large">{t("large")}</Radio>
              </Space>
            </Radio.Group>
          </div>

          {/* Density */}
          <div>
            <Title level={5}>{t("density")}</Title>
            <Radio.Group
              value={settings.appearanceSettings.density}
              onChange={(e) => handleChange("density", e.target.value)}
              className="mt-4"
            >
              <Space direction="vertical">
                <Radio value="comfortable">{t("comfortable")}</Radio>
                <Radio value="compact">{t("compact")}</Radio>
              </Space>
            </Radio.Group>
          </div>

          {/* Color Scheme */}
          <div>
            <Title level={5}>{t("colorScheme")}</Title>
            <Select
              value={settings.appearanceSettings.colorScheme}
              onChange={(value) => handleChange("colorScheme", value)}
              className="w-full mt-4"
            >
              <Option value="blue">Blue</Option>
              <Option value="green">Green</Option>
              <Option value="purple">Purple</Option>
              <Option value="orange">Orange</Option>
            </Select>
          </div>
        </div>
      </Card>
    </Motion.div>
  );
};

export default AppearanceSettings;
