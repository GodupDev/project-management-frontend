// src/components/TaskBoard.jsx (hoặc nơi bạn đang quản lý component)
import React from "react";
import { Card, Tag, Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLanguage } from "../../../context/LanguageContext";

const TaskBoard = ({ tasks = [], onTaskClick }) => {
  const { t } = useLanguage();

  const columns = [
    {
      title: t("todo"),
      tasks: tasks.filter((task) => task.status === t("toDo")),
      color: "default",
    },
    {
      title: t("inProgress"),
      tasks: tasks.filter((task) => task.status === t("inProgress")),
      color: "processing",
    },
    {
      title: t("review"),
      tasks: tasks.filter((task) => task.status === t("review")),
      color: "warning",
    },
    {
      title: t("completed"),
      tasks: tasks.filter((task) => task.status === t("completed")),
      color: "success",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case t("high"):
        return "red";
      case t("medium"):
        return "gold";
      case t("low"):
        return "green";
      default:
        return "default";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => (
        <div key={`column-${column.title}`} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
              {column.title}
            </h3>
            <Tag color={column.color}>{column.tasks.length}</Tag>
          </div>
          <div className="!space-y-2">
            {column.tasks.map((task) => (
              <Card
                key={`task-${task.id}`}
                hoverable
                className="cursor-pointer"
                onClick={() => onTaskClick(task)}
              >
                <div className="space-y-2">
                  <h4 className="font-medium">{task.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Tag
                      color={
                        task.priority === t("high")
                          ? "red"
                          : task.priority === t("medium")
                          ? "gold"
                          : "gray"
                      }
                    >
                      {task.priority}
                    </Tag>
                    <Avatar.Group>
                      {task.assignees?.map((assignee) => (
                        <Tooltip
                          key={`assignee-${assignee?.id || "unknown"}`}
                          title={assignee?.fullName || t("unknownUser")}
                        >
                          <Avatar
                            src={assignee?.avatar}
                            icon={!assignee?.avatar && <UserOutlined />}
                          >
                            {!assignee?.avatar &&
                              (assignee?.fullName?.[0] || "?")}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </Avatar.Group>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
