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
        <div className="p-5">
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
        </div>
      </Card>
    </Motion.div>
  );
};

export default AppearanceSettings;
