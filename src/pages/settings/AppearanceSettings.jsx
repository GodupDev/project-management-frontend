import React from "react";
import { Card, Select, Radio, Space, Typography } from "antd";
import { useMockData } from "../../context/MockDataContext";

const { Title } = Typography;
const { Option } = Select;

const AppearanceSettings = () => {
  const { settings, updateSettings } = useMockData();

  const handleChange = (key, value) => {
    updateSettings({
      appearanceSettings: {
        ...settings.appearanceSettings,
        [key]: value,
      },
    });
  };

  return (
    <Card title="Appearance Settings" className="mb-4">
      <div className="space-y-6">
        {/* Theme */}
        <div>
          <Title level={5}>Theme</Title>
          <Radio.Group
            value={settings.appearanceSettings.theme}
            onChange={(e) => handleChange("theme", e.target.value)}
            className="mt-4"
          >
            <Space direction="vertical">
              <Radio value="light">Light</Radio>
              <Radio value="dark">Dark</Radio>
              <Radio value="system">System</Radio>
            </Space>
          </Radio.Group>
        </div>

        {/* Language */}
        <div>
          <Title level={5}>Language</Title>
          <Select
            value={settings.appearanceSettings.language}
            onChange={(value) => handleChange("language", value)}
            className="w-full mt-4"
          >
            <Option value="en">English</Option>
            <Option value="vi">Tiếng Việt</Option>
            <Option value="ja">日本語</Option>
            <Option value="ko">한국어</Option>
          </Select>
        </div>

        {/* Font Size */}
        <div>
          <Title level={5}>Font Size</Title>
          <Radio.Group
            value={settings.appearanceSettings.fontSize}
            onChange={(e) => handleChange("fontSize", e.target.value)}
            className="mt-4"
          >
            <Space direction="vertical">
              <Radio value="small">Small</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="large">Large</Radio>
            </Space>
          </Radio.Group>
        </div>

        {/* Density */}
        <div>
          <Title level={5}>Density</Title>
          <Radio.Group
            value={settings.appearanceSettings.density}
            onChange={(e) => handleChange("density", e.target.value)}
            className="mt-4"
          >
            <Space direction="vertical">
              <Radio value="comfortable">Comfortable</Radio>
              <Radio value="compact">Compact</Radio>
            </Space>
          </Radio.Group>
        </div>

        {/* Color Scheme */}
        <div>
          <Title level={5}>Color Scheme</Title>
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
  );
};

export default AppearanceSettings;
