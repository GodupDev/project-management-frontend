import React from "react";
import { Card, Switch, Divider, Typography } from "antd";
import { useMockData } from "../../context/MockDataContext";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const { Title } = Typography;

const NotificationSettings = () => {
  const { settings, updateSettings } = useMockData();
  const { t } = useLanguage();

  const handleToggle = (channel, type) => {
    const newSettings = {
      ...settings.notificationPreferences,
      [channel]: {
        ...settings.notificationPreferences[channel],
        [type]: !settings.notificationPreferences[channel][type],
      },
    };

    updateSettings({
      notificationPreferences: newSettings,
    });
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card title={t("settingsNotifications")} className="mb-4">
        <div className="space-y-6">
          {/* Email Notifications */}
          <div>
            <Title level={5}>{t("notifEmail")}</Title>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span>{t("notifDailyDigest")}</span>
                <Switch
                  checked={settings.notificationPreferences.email.dailyDigest}
                  onChange={() => handleToggle("email", "dailyDigest")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifTaskUpdates")}</span>
                <Switch
                  checked={settings.notificationPreferences.email.taskUpdates}
                  onChange={() => handleToggle("email", "taskUpdates")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifProjectUpdates")}</span>
                <Switch
                  checked={
                    settings.notificationPreferences.email.projectUpdates
                  }
                  onChange={() => handleToggle("email", "projectUpdates")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifMentions")}</span>
                <Switch
                  checked={settings.notificationPreferences.email.mentions}
                  onChange={() => handleToggle("email", "mentions")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifComments")}</span>
                <Switch
                  checked={settings.notificationPreferences.email.comments}
                  onChange={() => handleToggle("email", "comments")}
                />
              </div>
            </div>
          </div>

          <Divider />

          {/* Push Notifications */}
          <div>
            <Title level={5}>{t("notifPush")}</Title>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span>{t("notifTaskUpdates")}</span>
                <Switch
                  checked={settings.notificationPreferences.push.taskUpdates}
                  onChange={() => handleToggle("push", "taskUpdates")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifProjectUpdates")}</span>
                <Switch
                  checked={settings.notificationPreferences.push.projectUpdates}
                  onChange={() => handleToggle("push", "projectUpdates")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifMentions")}</span>
                <Switch
                  checked={settings.notificationPreferences.push.mentions}
                  onChange={() => handleToggle("push", "mentions")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifComments")}</span>
                <Switch
                  checked={settings.notificationPreferences.push.comments}
                  onChange={() => handleToggle("push", "comments")}
                />
              </div>
            </div>
          </div>

          <Divider />

          {/* Desktop Notifications */}
          <div>
            <Title level={5}>{t("notifDesktop")}</Title>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span>{t("notifTaskUpdates")}</span>
                <Switch
                  checked={settings.notificationPreferences.desktop.taskUpdates}
                  onChange={() => handleToggle("desktop", "taskUpdates")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifProjectUpdates")}</span>
                <Switch
                  checked={
                    settings.notificationPreferences.desktop.projectUpdates
                  }
                  onChange={() => handleToggle("desktop", "projectUpdates")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifMentions")}</span>
                <Switch
                  checked={settings.notificationPreferences.desktop.mentions}
                  onChange={() => handleToggle("desktop", "mentions")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("notifComments")}</span>
                <Switch
                  checked={settings.notificationPreferences.desktop.comments}
                  onChange={() => handleToggle("desktop", "comments")}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Motion.div>
  );
};

export default NotificationSettings;
