import React from "react";
import { Card, Switch, Select, Typography } from "antd";
import { useMockData } from "../../context/MockDataContext";

const { Title } = Typography;
const { Option } = Select;

const PrivacySettings = () => {
  const { settings, updateSettings } = useMockData();

  const handleToggle = (key) => {
    updateSettings({
      privacySettings: {
        ...settings.privacySettings,
        [key]: !settings.privacySettings[key],
      },
    });
  };

  const handleVisibilityChange = (value) => {
    updateSettings({
      privacySettings: {
        ...settings.privacySettings,
        profileVisibility: value,
      },
    });
  };

  return (
    <Card title="Privacy Settings" className="mb-4">
      <div className="space-y-6">
        {/* Profile Visibility */}
        <div>
          <Title level={5}>Profile Visibility</Title>
          <Select
            value={settings.privacySettings.profileVisibility}
            onChange={handleVisibilityChange}
            className="w-full mt-4"
          >
            <Option value="public">Public</Option>
            <Option value="team">Team Only</Option>
            <Option value="private">Private</Option>
          </Select>
        </div>

        {/* Contact Information */}
        <div>
          <Title level={5}>Contact Information</Title>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <span>Show Email Address</span>
              <Switch
                checked={settings.privacySettings.showEmail}
                onChange={() => handleToggle("showEmail")}
              />
            </div>
            <div className="flex justify-between items-center">
              <span>Show Phone Number</span>
              <Switch
                checked={settings.privacySettings.showPhone}
                onChange={() => handleToggle("showPhone")}
              />
            </div>
          </div>
        </div>

        {/* Activity */}
        <div>
          <Title level={5}>Activity</Title>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <span>Show Activity Status</span>
              <Switch
                checked={settings.privacySettings.showActivity}
                onChange={() => handleToggle("showActivity")}
              />
            </div>
            <div className="flex justify-between items-center">
              <span>Show Location</span>
              <Switch
                checked={settings.privacySettings.showLocation}
                onChange={() => handleToggle("showLocation")}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PrivacySettings;
