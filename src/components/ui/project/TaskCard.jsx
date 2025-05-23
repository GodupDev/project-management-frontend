// components/ui/project/TaskCard.tsx
import React from "react";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";

const TaskCard = ({ title, status1, status2, timeSpent, assignee }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
      <div className="flex flex-col">
        <h4 className="text-base font-semibold text-gray-800">{title}</h4>
        <div className="text-xs text-gray-500">
          Opened 10 days ago by Yash Ghel
        </div>
        <div className="flex mt-2 space-x-2">
          <Tag color={status1 === "Completed" ? "green" : "red"}>{status1}</Tag>
          <Tag color={status2 === "Completed" ? "green" : "red"}>{status2}</Tag>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center text-sm text-gray-600">
          <ClockCircleOutlined className="mr-1" />
          {timeSpent}
        </div>
        <Tooltip title={assignee}>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <UserOutlined />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default TaskCard;
