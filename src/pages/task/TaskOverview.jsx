import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  Modal,
  Table,
  Tag,
  message
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CreateTaskBoard from "../../components/modals/CreateTask";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask } from "../../store/slices/taskSlice";
import { fetchUsers } from "../../store/slices/userSlice";

// Define task statuses
const taskStatuses = {
  todo: { label: "To Do", color: "default" },
  in_progress: { label: "In Progress", color: "processing" },
  review: { label: "Review", color: "warning" },
  completed: { label: "Completed", color: "success" },
};

// Define task priorities
const taskPriorities = {
  LOW: { label: "Low", color: "default" },
  MEDIUM: { label: "Medium", color: "warning" },
  HIGH: { label: "High", color: "error" },
};

const TaskOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const users = useSelector((state) => state.users?.list || []);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState("all");
  const currentUserId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateTask = async (taskData) => {
    try {
      await dispatch(createTask(taskData)).unwrap();
      setIsModalVisible(false);
      message.success(t("taskCreatedSuccess"));
      dispatch(fetchTasks());
    } catch (error) {
      message.error(t("taskCreateFailed") || "Failed to create task.");
    }
  };

  console.log("Users:", users);
  // Lấy tên người nhận từ mảng users
  const getAssigneeNames = (ids) => {
    if (!Array.isArray(ids)) return "";
    return ids
      .map((id) => {
        const user = users.find((u) => u._id === id);
        return user ? user.username || user.name : id;
      })
      .join(", ");
  };

  console.log("Tasks:", tasks);
  const mappedTasks = tasks.map((task) => ({
    id: task._id || task.id,
    title: task.taskTitle,
    status: (task.taskStatus || "").toLowerCase(),
    priority: (task.taskType || "low").toUpperCase(),
    assignee: getAssigneeNames(task.taskAssign),
    assigneeIds: Array.isArray(task.taskAssign) ? task.taskAssign : [],
    dueDate: task.taskEndDate ? task.taskEndDate.slice(0, 10) : "",
    project: task.projectId?.projectName || "",
  }));

  const filteredTasks = mappedTasks.filter((task) => {
    const matchesSearch = (task.title || "")
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesView =
      viewMode === "all" ||
      (viewMode === "mine" && task.assigneeIds.includes(currentUserId));
    return matchesSearch && matchesStatus && matchesPriority && matchesView;
  });

  const columns = [
    {
      title: t("Task"),
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a onClick={() => navigate(`/tasks/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (status) =>
        taskStatuses[status]
          ? <Tag color={taskStatuses[status].color}>{taskStatuses[status].label}</Tag>
          : <Tag>{status || t("UNKNOWN")}</Tag>,
    },
    {
      title: t("Priority"),
      dataIndex: "priority",
      key: "priority",
      render: (priority) =>
        taskPriorities[priority]
          ? <Tag color={taskPriorities[priority].color}>{taskPriorities[priority].label}</Tag>
          : <Tag>{priority || t("UNKNOWN")}</Tag>,
    },
    {
      title: t("Assignee"),
      dataIndex: "assignee",
      key: "assignee",
    },
    {
      title: t("Due Date"),
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: t("Project"),
      dataIndex: "project",
      key: "project",
    },
  ];

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
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: t("All Status") },
                ...Object.entries(taskStatuses).map(([key, value]) => ({
                  value: key,
                  label: value.label,
                })),
              ]}
            />
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={[
                { value: "all", label: t("All Priorities") },
                ...Object.entries(taskPriorities).map(([key, value]) => ({
                  value: key,
                  label: value.label,
                })),
              ]}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Button.Group>
              <Button
                type={viewMode === "all" ? "primary" : "default"}
                onClick={() => setViewMode("all")}
              >
                {t("All Tasks")}
              </Button>
              <Button
                type={viewMode === "mine" ? "primary" : "default"}
                onClick={() => setViewMode("mine")}
              >
                {t("My Tasks")}
              </Button>
            </Button.Group>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              {t("createTask")}
            </Button>
          </div>
        </div>
      </Card>

      <Card variant="outlined">
        <Table
          columns={columns}
          dataSource={filteredTasks}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          loading={loading}
        />
      </Card>

      <Modal
        title={t("createNewTask")}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <CreateTaskBoard onSuccess={handleCreateTask} />
      </Modal>
    </motion.div>
  );
};

export default TaskOverview;