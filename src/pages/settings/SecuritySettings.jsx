import React, { useState } from "react";
import { Card, Form, Input, Button, Switch, message } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { motion as Motion } from "framer-motion";

const SecuritySettings = () => {
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  // Hardcoded data
  const settings = {
    twoFactorAuth: true,
    loginNotifications: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    ipRestrictions: false,
    allowedIPs: ["192.168.1.1", "10.0.0.1"],
    lastPasswordChange: "2024-03-01",
  };

  const handleSave = (values) => {
    // In a real app, this would save the settings to the backend
    console.log("Saving security settings:", values);
    setIsEditing(false);
    message.success(t("settingsSaved"));
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <Card title={t("securitySettings")}>
          <Form
            form={form}
            layout="vertical"
            initialValues={settings}
            onFinish={handleSave}
          >
            <Form.Item
              name="twoFactorAuth"
              label={t("twoFactorAuth")}
              valuePropName="checked"
            >
              <Switch disabled={!isEditing} />
            </Form.Item>

            <Form.Item
              name="loginNotifications"
              label={t("loginNotifications")}
              valuePropName="checked"
            >
              <Switch disabled={!isEditing} />
            </Form.Item>

            <Form.Item
              name="passwordExpiry"
              label={t("passwordExpiry")}
              rules={[
                {
                  required: true,
                  message: t("pleaseEnterPasswordExpiry"),
                },
              ]}
            >
              <Input type="number" disabled={!isEditing} suffix={t("days")} />
            </Form.Item>

            <Form.Item
              name="sessionTimeout"
              label={t("sessionTimeout")}
              rules={[
                {
                  required: true,
                  message: t("pleaseEnterSessionTimeout"),
                },
              ]}
            >
              <Input
                type="number"
                disabled={!isEditing}
                suffix={t("minutes")}
              />
            </Form.Item>

            <Form.Item
              name="ipRestrictions"
              label={t("ipRestrictions")}
              valuePropName="checked"
            >
              <Switch disabled={!isEditing} />
            </Form.Item>

            <Form.Item
              name="allowedIPs"
              label={t("allowedIPs")}
              rules={[
                {
                  required: true,
                  message: t("pleaseEnterAllowedIPs"),
                },
              ]}
            >
              <Input.TextArea
                disabled={!isEditing}
                placeholder={t("enterIPsCommaSeparated")}
              />
            </Form.Item>

            <div className="flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(false)}>
                    {t("cancel")}
                  </Button>
                  <Button type="primary" htmlType="submit">
                    {t("save")}
                  </Button>
                </>
              ) : (
                <Button type="primary" onClick={() => setIsEditing(true)}>
                  {t("edit")}
                </Button>
              )}
            </div>
          </Form>
        </Card>
      </div>
    </Motion.div>
  );
};

export default SecuritySettings;
