import React from "react";
import { Card, Switch, Select, Typography, Button, message } from "antd";
import { useMockData } from "../../context/MockDataContext";

const { Title } = Typography;
const { Option } = Select;

const SecuritySettings = () => {
  const { settings, updateSettings } = useMockData();

  const handleToggle = (key) => {
    updateSettings({
      securitySettings: {
        ...settings.securitySettings,
        [key]: !settings.securitySettings[key],
      },
    });
  };

  const handleMethodChange = (value) => {
    updateSettings({
      securitySettings: {
        ...settings.securitySettings,
        twoFactorMethod: value,
      },
    });
  };

  const handleSessionTimeoutChange = (value) => {
    updateSettings({
      securitySettings: {
        ...settings.securitySettings,
        sessionTimeout: value,
      },
    });
  };

  const handleChangePassword = () => {
    message.info("Change password functionality will be implemented soon");
  };

  return (
    <Card title="Security Settings" className="mb-4">
      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <div>
          <Title level={5}>Two-Factor Authentication</Title>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <span>Enable Two-Factor Authentication</span>
              <Switch
                checked={settings.securitySettings.twoFactorEnabled}
                onChange={() => handleToggle("twoFactorEnabled")}
              />
            </div>
            {settings.securitySettings.twoFactorEnabled && (
              <div>
                <Title level={5} className="mt-4">
                  Authentication Method
                </Title>
                <Select
                  value={settings.securitySettings.twoFactorMethod}
                  onChange={handleMethodChange}
                  className="w-full mt-2"
                >
                  <Option value="authenticator">Authenticator App</Option>
                  <Option value="sms">SMS</Option>
                  <Option value="email">Email</Option>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Session Settings */}
        <div>
          <Title level={5}>Session Settings</Title>
          <div className="space-y-4 mt-4">
            <div>
              <span>Session Timeout (minutes)</span>
              <Select
                value={settings.securitySettings.sessionTimeout}
                onChange={handleSessionTimeoutChange}
                className="w-full mt-2"
              >
                <Option value={15}>15 minutes</Option>
                <Option value={30}>30 minutes</Option>
                <Option value={60}>1 hour</Option>
                <Option value={120}>2 hours</Option>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <span>Login Notifications</span>
              <Switch
                checked={settings.securitySettings.loginNotifications}
                onChange={() => handleToggle("loginNotifications")}
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div>
          <Title level={5}>Password</Title>
          <div className="space-y-4 mt-4">
            <div>
              <p className="text-gray-600">
                Last changed: {settings.securitySettings.passwordLastChanged}
              </p>
              <Button
                type="primary"
                onClick={handleChangePassword}
                className="mt-2"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SecuritySettings;
