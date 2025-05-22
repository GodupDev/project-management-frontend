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
            <span className="font-semibold text-[var(--color-text-primary)]">
              {project.name}
            </span>
            <Tag className="!bg-[#ef4444] !text-[var(--color-text-primary)] !border-[red] cursor-pointer">
              Off Track
            </Tag>
          </div>
        }
        className="rounded-xl border-[var(--color-border)] hover:shadow-md transition-shadow duration-200 cursor-pointer"
        style={{
          backgroundColor: "var(--color-background-paper)",
        }}
        bordered={false}
      >
        <p
          className="!text-[var(--color-text-secondary)]"
          ellipsis={{ rows: 3 }}
        >
          {project.description}
        </p>

        <div className="flex items-center mt-4 text-sm text-[var(--color-text-secondary)] gap-2">
          <CalendarOutlined className="text-[var(--color-text-secondary)]" />
          <span>{dayjs(project.date).format("DD MMMM, YYYY")}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex -space-x-2">
            {project.team.map((avatar, i) => (
              <Tooltip key={i} title={`Member ${i + 1}`}>
                <Avatar
                  src={avatar}
                  size="small"
                  className="border border-[var(--color-border)]"
                />
              </Tooltip>
            ))}
          </div>
          <div className="flex items-center text-[var(--color-text-secondary)] text-sm gap-1">
            <ExclamationCircleOutlined className="text-[var(--color-text-secondary)]" />
            <span>{project.issues} issues</span>
          </div>
        </div>
      </Card>
    </Motion.div>
  );
};

export default ProjectCard;
