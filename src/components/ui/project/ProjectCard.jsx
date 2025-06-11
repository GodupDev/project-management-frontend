import { motion as Motion } from "framer-motion";
import dayjs from "dayjs";

import { Card, Tag, Avatar, Tooltip } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const ProjectCard = ({ project }) => {
  return (
    <Motion.div
      key={project.id}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        title={
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">
              {project.projectName}
            </span>
            <Tag className="bg-red-100 text-red-600 border-red-200 rounded-md px-2 py-1 text-xs">
              Off Track
            </Tag>
          </div>
        }
        className="rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        variant="borderless"
      >
        <p className="text-gray-600 text-sm line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center mt-4 text-sm text-gray-500 gap-2">
          <CalendarOutlined className="text-gray-500" />
          <span>{dayjs(project.date).format("DD MMMM, YYYY")}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex -space-x-2">
            {project.members?.map((member, i) => (
              <Tooltip key={i} title={member.user.fullName}>
                <Avatar
                  src={member.user.avatar}
                  size="small"
                  className="ring-1 ring-gray-200"
                />
              </Tooltip>
            ))}
          </div>
          <div className="flex items-center text-gray-500 text-sm gap-1">
            <ExclamationCircleOutlined className="text-gray-500" />
            <span>{project.totalTasks} tasks</span>
          </div>
        </div>
      </Card>
    </Motion.div>
  );
};

export default ProjectCard;
