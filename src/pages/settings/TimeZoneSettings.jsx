import React from "react";
import { Card, Select, Radio, Typography } from "antd";
import { useMockData } from "../../context/MockDataContext";
import { motion as Motion } from "framer-motion";

const { Title } = Typography;
const { Option } = Select;

const TimeZoneSettings = () => {
  const { settings, updateSettings } = useMockData();

  const handleChange = (key, value) => {
    updateSettings({
      timeZoneSettings: {
        ...settings.timeZoneSettings,
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
      <Card title="Time Zone Settings" className="mb-4">
        <div className="space-y-6">
          {/* Time Zone */}
          <div>
            <Title level={5}>Time Zone</Title>
            <Select
              value={settings.timeZoneSettings.timezone}
              onChange={(value) => handleChange("timezone", value)}
              className="w-full mt-4"
            >
              <Option value="Asia/Ho_Chi_Minh">Ho Chi Minh City (GMT+7)</Option>
              <Option value="Asia/Singapore">Singapore (GMT+8)</Option>
              <Option value="Asia/Tokyo">Tokyo (GMT+9)</Option>
              <Option value="America/New_York">New York (GMT-5)</Option>
              <Option value="Europe/London">London (GMT+0)</Option>
            </Select>
          </div>

          {/* Date Format */}
          <div>
            <Title level={5}>Date Format</Title>
            <Select
              value={settings.timeZoneSettings.dateFormat}
              onChange={(value) => handleChange("dateFormat", value)}
              className="w-full mt-4"
            >
              <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
              <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
              <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
              <Option value="DD.MM.YYYY">DD.MM.YYYY</Option>
            </Select>
          </div>

          {/* Time Format */}
          <div>
            <Title level={5}>Time Format</Title>
            <Radio.Group
              value={settings.timeZoneSettings.timeFormat}
              onChange={(e) => handleChange("timeFormat", e.target.value)}
              className="mt-4"
            >
              <Radio value="12h">12-hour (AM/PM)</Radio>
              <Radio value="24h">24-hour</Radio>
            </Radio.Group>
          </div>

          {/* Week Starts On */}
          <div>
            <Title level={5}>Week Starts On</Title>
            <Select
              value={settings.timeZoneSettings.weekStartsOn}
              onChange={(value) => handleChange("weekStartsOn", value)}
              className="w-full mt-4"
            >
              <Option value="monday">Monday</Option>
              <Option value="sunday">Sunday</Option>
            </Select>
          </div>
        </div>
      </Card>
    </Motion.div>
  );
};

export default TimeZoneSettings;
