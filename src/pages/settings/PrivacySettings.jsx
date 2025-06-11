import React, { useState } from "react";
import { Card, Switch, Select, Typography, Button, message } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { motion as Motion } from "framer-motion";

const { Title } = Typography;
const { Option } = Select;

const PrivacySettings = () => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  // Hardcoded data
  const settings = {
    profileVisibility: "public",
    activityVisibility: "team",
    emailNotifications: true,
    dataCollection: true,
    analytics: true,
    thirdPartySharing: false,
  };

  const handleSettingChange = (setting, value) => {
    // In a real app, this would update the setting in the backend
    console.log("Updating setting:", setting, value);
  };

  const handleSaveSettings = () => {
    // In a real app, this would save all settings to the backend
    console.log("Saving settings:", settings);
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
        <Card title={t("privacySettings")}>
          {/* Profile Privacy */}
          <div className="mb-6">
            <Title level={5}>{t("profilePrivacy")}</Title>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span>{t("profileVisibility")}</span>
                <Select
                  value={settings.profileVisibility}
                  onChange={(value) =>
                    handleSettingChange("profileVisibility", value)
                  }
                  disabled={!isEditing}
                  style={{ width: 200 }}
                >
                  <Option value="public">{t("public")}</Option>
                  <Option value="team">{t("team")}</Option>
                  <Option value="private">{t("private")}</Option>
                </Select>
              </div>
              <div className="flex justify-between items-center">
                <span>{t("activityVisibility")}</span>
                <Select
                  value={settings.activityVisibility}
                  onChange={(value) =>
                    handleSettingChange("activityVisibility", value)
                  }
                  disabled={!isEditing}
                  style={{ width: 200 }}
                >
                  <Option value="public">{t("public")}</Option>
                  <Option value="team">{t("team")}</Option>
                  <Option value="private">{t("private")}</Option>
                </Select>
              </div>
            </div>
          </div>

          {/* Data Privacy */}
          <div className="mb-6">
            <Title level={5}>{t("dataPrivacy")}</Title>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span>{t("emailNotifications")}</span>
                <Switch
                  checked={settings.emailNotifications}
                  onChange={(checked) =>
                    handleSettingChange("emailNotifications", checked)
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("dataCollection")}</span>
                <Switch
                  checked={settings.dataCollection}
                  onChange={(checked) =>
                    handleSettingChange("dataCollection", checked)
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("analytics")}</span>
                <Switch
                  checked={settings.analytics}
                  onChange={(checked) =>
                    handleSettingChange("analytics", checked)
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("thirdPartySharing")}</span>
                <Switch
                  checked={settings.thirdPartySharing}
                  onChange={(checked) =>
                    handleSettingChange("thirdPartySharing", checked)
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <Button onClick={() => setIsEditing(false)}>
                  {t("cancel")}
                </Button>
                <Button type="primary" onClick={handleSaveSettings}>
                  {t("save")}
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={() => setIsEditing(true)}>
                {t("edit")}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Motion.div>
  );
};

export default PrivacySettings;
