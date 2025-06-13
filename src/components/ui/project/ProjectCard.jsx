import { motion as Motion } from "framer-motion";
import dayjs from "dayjs";
import { Card, Tag } from "antd";
import { CalendarOutlined, TeamOutlined } from "@ant-design/icons";

const statusColorMap = {
  active: { color: "green", label: "Active" },
  completed: { color: "blue", label: "Completed" },
  pending: { color: "orange", label: "Pending" },
  archived: { color: "gray", label: "Archived" },
};

const ProjectCard = ({ project }) => {
  const statusInfo = statusColorMap[project.status] || {
    color: "default",
    label: project.status,
  };

  return (
    <Motion.div
      key={project._id}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        title={
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">
              {project.projectName}
            </span>
            <Tag
              color={statusInfo.color}
              className="rounded-md px-2 py-1 text-xs"
            >
              {statusInfo.label}
            </Tag>
          </div>
        }
        className="rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        variant="borderless"
      >
        <div className="flex items-center mt-2 text-sm text-gray-500 gap-2">
          <CalendarOutlined />
          <span>
            {dayjs(project.dateRange?.startDate).format("DD MMM YYYY")}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <TeamOutlined />
            <span>{project.memberCount ?? 0} members</span>
          </div>
        </div>
      </Card>
    </Motion.div>
  );
};

export default ProjectCard;
