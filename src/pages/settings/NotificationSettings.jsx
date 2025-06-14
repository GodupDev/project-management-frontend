import React, { useState, useEffect } from "react";
import { Card, Switch, Typography, Button, message } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { motion as Motion } from "framer-motion";
import { useSaveNotificationSettingsMutation } from "../../services/notificationApi";
import { useSelector, useDispatch } from "react-redux";
// import { selectCurrentUser } from "../../../store/slices/authSlice";
const { Title } = Typography;

import { selectCurrentUser } from "@/store/slices/authSlice";
import { updateUserProfileSettings } from "@/store/slices/userProfileSlice";
import { api } from "@/services/api";

const NotificationSettings = () => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  
  // RTK Query hook
  const [saveSettings, { isLoading }] = useSaveNotificationSettingsMutation();

  // Khởi tạo state từ settings hiện tại của người dùng hoặc giá trị mặc định
  const [settings, setSettings] = useState({
    emailNotifications: {
      taskUpdates: true,
      projectUpdates: true,
      mentions: true,
      dailyDigest: false,
      weeklyReport: true,
    },
    pushNotifications: {
      taskUpdates: true,
      projectUpdates: false,
      mentions: true,
      comments: true,
    },
    inAppNotifications: {
      taskUpdates: true,
      projectUpdates: true,
      mentions: true,
      comments: true,
      systemUpdates: true,
    },
  });

  // Lấy settings từ user profile (nếu có)
  useEffect(() => {
    if (currentUser?.notificationSettings) {
      setSettings(currentUser.notificationSettings);
    }
  }, [currentUser]);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    try {
      console.log("Đang lưu cài đặt:", settings);

      // Gọi mutation với đầy đủ thông tin
      const result = await saveSettings(settings).unwrap();
      
      console.log("Kết quả từ server:", result);
      
      // Cập nhật cài đặt trong Redux store
      dispatch(updateUserProfileSettings(settings));
      
      setIsEditing(false);
      message.success(t("settingsSaved"));
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      message.error(error?.data?.message || t("savingFailed"));
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <Card title={t("notificationSettings")}>
          {/* Email Notifications */}
          <div className="mb-6">
            <Title level={5}>{t("emailNotifications")}</Title>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span>{t("taskUpdates")}</span>
                <Switch
                  checked={settings.emailNotifications.taskUpdates}
                  onChange={(checked) =>
                    handleSettingChange(
                      "emailNotifications",
                      "taskUpdates",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("projectUpdates")}</span>
                <Switch
                  checked={settings.emailNotifications.projectUpdates}
                  onChange={(checked) =>
                    handleSettingChange(
                      "emailNotifications",
                      "projectUpdates",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("mentions")}</span>
                <Switch
                  checked={settings.emailNotifications.mentions}
                  onChange={(checked) =>
                    handleSettingChange(
                      "emailNotifications",
                      "mentions",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("dailyDigest")}</span>
                <Switch
                  checked={settings.emailNotifications.dailyDigest}
                  onChange={(checked) =>
                    handleSettingChange(
                      "emailNotifications",
                      "dailyDigest",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("weeklyReport")}</span>
                <Switch
                  checked={settings.emailNotifications.weeklyReport}
                  onChange={(checked) =>
                    handleSettingChange(
                      "emailNotifications",
                      "weeklyReport",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="mb-6">
            <Title level={5}>{t("pushNotifications")}</Title>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span>{t("taskUpdates")}</span>
                <Switch
                  checked={settings.pushNotifications.taskUpdates}
                  onChange={(checked) =>
                    handleSettingChange(
                      "pushNotifications",
                      "taskUpdates",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("projectUpdates")}</span>
                <Switch
                  checked={settings.pushNotifications.projectUpdates}
                  onChange={(checked) =>
                    handleSettingChange(
                      "pushNotifications",
                      "projectUpdates",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("mentions")}</span>
                <Switch
                  checked={settings.pushNotifications.mentions}
                  onChange={(checked) =>
                    handleSettingChange(
                      "pushNotifications",
                      "mentions",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("comments")}</span>
                <Switch
                  checked={settings.pushNotifications.comments}
                  onChange={(checked) =>
                    handleSettingChange(
                      "pushNotifications",
                      "comments",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* In-App Notifications */}
          <div className="mb-6">
            <Title level={5}>{t("inAppNotifications")}</Title>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span>{t("taskUpdates")}</span>
                <Switch
                  checked={settings.inAppNotifications.taskUpdates}
                  onChange={(checked) =>
                    handleSettingChange(
                      "inAppNotifications",
                      "taskUpdates",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("projectUpdates")}</span>
                <Switch
                  checked={settings.inAppNotifications.projectUpdates}
                  onChange={(checked) =>
                    handleSettingChange(
                      "inAppNotifications",
                      "projectUpdates",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("mentions")}</span>
                <Switch
                  checked={settings.inAppNotifications.mentions}
                  onChange={(checked) =>
                    handleSettingChange(
                      "inAppNotifications",
                      "mentions",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("comments")}</span>
                <Switch
                  checked={settings.inAppNotifications.comments}
                  onChange={(checked) =>
                    handleSettingChange(
                      "inAppNotifications",
                      "comments",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>{t("systemUpdates")}</span>
                <Switch
                  checked={settings.inAppNotifications.systemUpdates}
                  onChange={(checked) =>
                    handleSettingChange(
                      "inAppNotifications",
                      "systemUpdates",
                      checked,
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Phần buttons dưới cùng */}
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <Button onClick={() => setIsEditing(false)}>
                  {t("cancel")}
                </Button>
                <Button type="primary" onClick={handleSaveSettings} loading={isLoading}>
                  {t("save")}
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={() => setIsEditing(true)}>
                {t("edit")}
              </Button>
            )}
          </div>
        </Card>      </div>    </Motion.div>  );};export default NotificationSettings;
