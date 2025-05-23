import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Tag,
  Modal,
  Input,
  Tooltip,
  Avatar,
  message,
  Select,
  Space,
} from "antd";
import {
  PlusOutlined,
  UserAddOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import TaskCard from "../../components/ui/project/TaskCard";

const { Title, Text } = Typography;

const tasks = Array(4).fill({
  title: "Implement payment API integration",
  status1: "Completed",
  status2: "Cancelled",
  timeSpent: "00:45:00",
  assignee: "John Doe",
});

const calculateTotalTime = () => {
  let totalMinutes = 0;
  for (const task of tasks) {
    const [h, m] = task.timeSpent.split(":").map(Number);
    totalMinutes += h * 60 + m;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00`;
};

const ProjectSpecific = () => {
  const { projectName } = useParams();

  const [members, setMembers] = useState(["John", "Emma"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleAddMember = () => {
    const name = newMember.trim();
    if (!name) {
      message.error("Member name cannot be empty");
      return;
    }
    if (members.includes(name)) {
      message.warning("This member already exists");
      return;
    }
    setMembers([...members, name]);
    setNewMember("");
    setIsModalOpen(false);
    message.success("Member added successfully");
  };

  const removeMember = (name) => {
    setMembers(members.filter((m) => m !== name));
    message.success(`${name} removed`);
  };

  const filteredTasks =
    filterStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status1 === filterStatus);

  return (
    <div className="p-2 min-h-screen">
      {/* Title */}
      <Title level={3} className="mb-4 text-gray-800 w-full">
        Project / {projectName}
      </Title>

      {/* Project Info */}
      <div className="flex flex-wrap justify-between items-center p-4 rounded-md mb-2 w-full gap-4">
        <Tag color="green" className="rounded-lg px-3 py-1 font-medium">
          On Track
        </Tag>
        <Text
          type="secondary"
          className="flex items-center gap-1 text-sm whitespace-nowrap"
        >
          <ClockCircleOutlined /> Time Spent:{" "}
          <strong>{calculateTotalTime()}</strong>
        </Text>
        <Text
          type="secondary"
          className="flex items-center gap-1 text-sm whitespace-nowrap"
        >
          <CalendarOutlined /> Deadline: <strong>6M : 0W : 0D</strong>
        </Text>
        <Text type="secondary" className="text-sm whitespace-nowrap">
          Started: Jan 12, 2025
        </Text>
      </div>

      {/* Members */}
      <div className="mb-10 w-full">
        <div className="flex justify-between items-center mb-2 w-full">
          <Text strong className="text-gray-700 text-base">
            Team Members
          </Text>
        </div>
        <div className="flex">
          <div className="flex gap-3 flex-wrap w-full">
            {members.map((name) => (
              <Tooltip title={`Remove ${name}`} key={name}>
                <Avatar
                  className="bg-blue-600 text-white cursor-pointer"
                  onClick={() => removeMember(name)}
                >
                  {name[0].toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </div>
          <Button
            className="h-4"
            icon={<UserAddOutlined />}
            size="small"
            onClick={() => setIsModalOpen(true)}
          >
            Add Member
          </Button>
        </div>
      </div>

      {/* Filter + Assign */}
      <div className="flex justify-between items-center mb-4 w-full">
        <Select
          size="small"
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            { label: "All Tasks", value: "All" },
            { label: "Completed", value: "Completed" },
            { label: "Cancelled", value: "Cancelled" },
          ]}
          className="w-40"
        />
        <Button size="small" type="primary" icon={<PlusOutlined />}>
          Assign Task
        </Button>
      </div>

      {/* Task List */}
      <div className="space-y-3 w-full">
        {filteredTasks.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>

      {/* Add Member Modal */}
      <Modal
        title="Add New Member"
        open={isModalOpen}
        onOk={handleAddMember}
        onCancel={() => setIsModalOpen(false)}
        okText="Add"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter member name"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          onPressEnter={handleAddMember}
          size="middle"
          className="w-full"
        />
      </Modal>
    </div>
  );
};

export default ProjectSpecific;
