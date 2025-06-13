import React from "react";
import { Dropdown, Badge, List, Typography, Button, Tooltip, Tag } from "antd";
import {
  BellOutlined,
  UserOutlined,
  FileTextOutlined,
  ProjectOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const { Text } = Typography;

const getIcon = (type) => {
  const baseStyle =
    "rounded-full p-1.5 flex items-center justify-center shadow-sm";
  switch (type) {
    case "project":
      return (
        <ProjectOutlined
          className={`text-blue-600 bg-blue-100 ${baseStyle}`}
          style={{ width: 28, height: 28, fontSize: 16 }}
        />
      );
    case "mention":
      return (
        <UserOutlined
          className={`text-purple-600 bg-purple-100 ${baseStyle}`}
          style={{ width: 28, height: 28, fontSize: 16 }}
        />
      );
    case "task":
      return (
        <FileTextOutlined
          className={`text-green-600 bg-green-100 ${baseStyle}`}
          style={{ width: 28, height: 28, fontSize: 16 }}
        />
      );
    default:
      return (
        <BellOutlined
          className={`text-gray-500 bg-gray-100 ${baseStyle}`}
          style={{ width: 28, height: 28, fontSize: 16 }}
        />
      );
  }
};

const NotificationDropdown = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Hardcoded notifications data
  const notifications = [
    {
      id: 1,
      type: "task",
      title: "Task Completed",
      message: "The task 'Design Homepage' has been completed by Jane Smith",
      time: "2m ago",
      status: "unread",
    },
    {
      id: 2,
      type: "mention",
      title: "New Mention",
      message:
        "John Doe mentioned you in a comment on 'Implement Authentication'",
      time: "10m ago",
      status: "unread",
    },
    {
      id: 3,
      type: "project",
      title: "Project Updated",
      message: "The project 'Website Redesign' status changed to In Progress",
      time: "1h ago",
      status: "read",
    },
  ];

  const handleNotificationClick = (notification) => {
    // In a real app, this would update the notification status in the backend
    console.log("Navigate to", notification.type, ":", notification.message);
  };

  return (
    <div className="w-[320px] max-h-[35rem] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="text-base font-semibold text-gray-800 flex items-center gap-1 select-none">
          <BellOutlined className="text-blue-600 text-lg" />
          {t("navNotifications")}
        </div>
        <Tooltip title={t("commonSettings")}>
          <Button
            type="text"
            icon={<SettingOutlined className="text-gray-600 text-base" />}
            className="hover:bg-gray-200 rounded-full p-1 transition"
            aria-label={t("commonSettings")}
            size="small"
            onClick={() => navigate("./settings/notifications")}
          />
        </Tooltip>
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {t("notifNoNotifications")}
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={notifications.slice(0, 6)}
            renderItem={(item) => (
              <List.Item
                className={`transition-all px-4 py-2 cursor-pointer rounded-md mb-1 last:mb-0 m-1 ${
                  item.status === "unread"
                    ? "bg-blue-50 shadow-sm"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleNotificationClick(item)}
                aria-label={`${t("navNotifications")}: ${item.title}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleNotificationClick(item);
                  }
                }}
              >
                <div className="flex items-start gap-2 w-full">
                  <div>{getIcon(item.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <Text
                        strong
                        className="text-gray-900 text-sm truncate"
                        title={item.title}
                      >
                        {t(
                          `notif${
                            item.type === "project"
                              ? "ProjectUpdated"
                              : item.type === "mention"
                              ? "NewMention"
                              : item.type === "task"
                              ? "TaskAssigned"
                              : item.type
                          }`,
                        )}
                      </Text>
                      <Text
                        type="secondary"
                        className="text-xs whitespace-nowrap ml-2"
                      >
                        {item.time}
                      </Text>
                    </div>
                    <Text
                      className="text-xs text-gray-700 mt-0.5 line-clamp-2"
                      style={{ wordBreak: "break-word" }}
                      title={item.message}
                    >
                      {item.message}
                    </Text>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>

      {/* Footer */}
      <div className="text-center border-t border-gray-200 px-4 py-2 bg-gray-50">
        <Button
          type="link"
          className="text-blue-600 font-semibold hover:underline text-sm"
          onClick={() => navigate("/notifications")}
          aria-label={t("notifViewAll")}
          size="small"
        >
          {t("notifViewAll")}
        </Button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
