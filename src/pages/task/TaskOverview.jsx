import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  Space,
  Modal,
  message,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TaskBoard from "../../components/ui/task/TaskBoard";
import CreateTask from "../../components/modals/CreateTask";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useLanguage } from "../../context/LanguageContext";
import { DatePicker } from "antd";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Define task statuses
const taskStatuses = {
  TODO: { label: "To Do", color: "default" },
  IN_PROGRESS: { label: "In Progress", color: "processing" },
  REVIEW: { label: "Review", color: "warning" },
  DONE: { label: "Done", color: "success" },
  BLOCKED: { label: "Blocked", color: "error" },
};

// Define task priorities
const taskPriorities = {
  LOW: { label: "Low", color: "default" },
  MEDIUM: { label: "Medium", color: "warning" },
  HIGH: { label: "High", color: "error" },
};

const TaskOverview = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: "Implement user authentication",
      status: "IN_PROGRESS",
      priority: "HIGH",
      assignee: "John Doe",
      dueDate: "2024-03-15",
      project: "Website Redesign",
    },
    {
      id: 2,
      title: "Design database schema",
      status: "DONE",
      priority: "MEDIUM",
      assignee: "Jane Smith",
      dueDate: "2024-03-10",
      project: "Mobile App",
    },
    {
      id: 3,
      title: "Create API endpoints",
      status: "TODO",
      priority: "HIGH",
      assignee: "Mike Johnson",
      dueDate: "2024-03-20",
      project: "Backend Service",
    },
  ];

  const handleCreateTask = (taskData) => {
    // In a real app, this would create the task in the backend
    console.log("Creating task:", taskData);
    setIsModalVisible(false);
  };

  const handleUpdateTask = (taskId, updates) => {
    // In a real app, this would update the task in the backend
    console.log("Updating task:", taskId, updates);
  };

  const handleDeleteTask = (taskId) => {
    // In a real app, this would delete the task from the backend
    console.log("Deleting task:", taskId);
  };

  const columns = [
    {
      title: t("task"),
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a onClick={() => navigate(`/tasks/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={taskStatuses[status].color}>
          {taskStatuses[status].label}
        </Tag>
      ),
    },
    {
      title: t("priority"),
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag color={taskPriorities[priority].color}>
          {taskPriorities[priority].label}
        </Tag>
      ),
    },
    {
      title: t("assignee"),
      dataIndex: "assignee",
      key: "assignee",
    },
    {
      title: t("dueDate"),
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: t("project"),
      dataIndex: "project",
      key: "project",
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-5"
    >
      <Card variant="outlined" className="mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={t("searchTasks")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: t("allStatus") },
                ...Object.entries(taskStatuses).map(([key, value]) => ({
                  value: key,
                  label: value.label,
                })),
              ]}
            />
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={setPriorityFilter}
              options={[
                { value: "all", label: t("allPriorities") },
                ...Object.entries(taskPriorities).map(([key, value]) => ({
                  value: key,
                  label: value.label,
                })),
              ]}
            />
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            {t("createTask")}
          </Button>
        </div>
      </Card>

      <Card variant="outlined">
        <Table
          columns={columns}
          dataSource={filteredTasks}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={t("createNewTask")}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <CreateTask onSuccess={handleCreateTask} />
      </Modal>
    </motion.div>
  );
};

export default TaskOverview;
