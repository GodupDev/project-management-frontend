<<<<<<< HEAD
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
=======
// Optimized TaskOverview.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Button, Select, Modal, Table, Tag, Tabs, message } from "antd";
import { PlusOutlined, TableOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import CreateTaskBoard from "../../components/modals/CreateTask";
import { useLanguage } from "../../context/LanguageContext";
import { fetchTasks } from "../../store/slices/taskSlice";

>>>>>>> origin/main
const taskStatuses = {
  TODO: { label: "To Do", color: "default" },
  IN_PROGRESS: { label: "In Progress", color: "processing" },
  REVIEW: { label: "Review", color: "warning" },
<<<<<<< HEAD
  DONE: { label: "Done", color: "success" },
  BLOCKED: { label: "Blocked", color: "error" },
};

// Define task priorities
=======
  COMPLETED: { label: "Completed", color: "success" },
};

>>>>>>> origin/main
const taskPriorities = {
  LOW: { label: "Low", color: "default" },
  MEDIUM: { label: "Medium", color: "warning" },
  HIGH: { label: "High", color: "error" },
};

const TaskOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
<<<<<<< HEAD
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

=======

  const {
    tasks = [],
    loading,
    projects = [],
  } = useSelector(
    (state) => ({
      tasks: state.tasks.tasks,
      loading: state.tasks.loading,
      projects: state.tasks.allProjects,
    }),
    shallowEqual,
  );

  console.log(projects);
  const users = useSelector((state) => state.auth.users || []);
  const currentUser = useSelector((state) => state.auth.user);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    project: "all",
    assignee: ""
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get pagination info from Redux store
  const { pagination: serverPagination } = useSelector(
    (state) => ({
      pagination: state.tasks.pagination || {},
    }),
    shallowEqual,
  );

  const projectOptions = useMemo(
    () => [
      { value: "all", label: t("All Projects") },
      ...projects.map((p) => ({
        value: p.projectId,
        label: p.projectName,
      })),
    ],
    [projects, t],
  );

  const getAssigneeNames = useCallback(
    (assignees) =>
      assignees
        .map((a) => {
          const user = users.find(
            (u) => u._id === (typeof a === "string" ? a : a?._id),
          );
          return user?.username || user?.name || a?._id || "";
        })
        .filter(Boolean)
        .join(", ") || t("Unassigned"),
    [users, t],
  );

  // Transform tasks data
  const mappedTasks = useMemo(
    () =>
      tasks.map((task) => ({
        ...task,
        id: task._id,
        title: task.taskTitle || task.title || "No Title",
        status: (task.taskStatus || task.status || "").toUpperCase(),
        priority: (task.taskPriority || "low").toUpperCase(),
        assignee: getAssigneeNames(task.taskAssign || task.assignees || []),
        assigneeIds: (task.taskAssign || [])
          .map((a) => (typeof a === "string" ? a : a._id))
          .filter(Boolean),
        dueDate: task.taskEndDate || task.dueDate || "",
        project: task.projectId?.projectName || task.project?.name || "",
        projectId: task.projectId?._id || task.project?._id || "",
      })),
    [tasks, getAssigneeNames],
  );

  // Memoize filter functions for client-side filtering if needed
  const filterFns = useMemo(
    () => ({
      search: (task, search) =>
        !search || 
        (task.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (task.description?.toLowerCase() || '').includes(search.toLowerCase()),

      status: (task, status) => 
        status === "all" || 
        (task.status || '').toLowerCase() === status.toLowerCase(),

      priority: (task, priority) =>
        priority === "all" || 
        (task.priority || '').toLowerCase() === priority.toLowerCase(),

      project: (task, projectId) =>
        projectId === "all" || 
        task.projectId === projectId ||
        task.project?._id === projectId,

      assignee: (task, assigneeId) =>
        !assigneeId || 
        (task.assigneeIds || []).includes(assigneeId) ||
        (task.assignees || []).some(a => 
          (typeof a === 'string' ? a : a._id) === assigneeId
        )
    }),
    [],
  );

  // Fetch tasks with current filters and pagination
  const fetchTasksWithFilters = useCallback(() => {
    const params = {
      page: pagination.current,
      limit: pagination.pageSize,
      ...(filters.status !== "all" && { status: filters.status }),
      ...(filters.priority !== "all" && { priority: filters.priority }),
      ...(filters.project !== "all" && { project: filters.project }),
      ...(filters.search && { search: filters.search }),
      ...(filters.assignee && { assignee: filters.assignee }),
    };

    // If no assignee filter is set, show current user's tasks by default
    if (!filters.assignee) {
      params.assignee = currentUser?._id;
    }

    dispatch(fetchTasks(params));
  }, [
    dispatch,
    filters,
    pagination.current,
    pagination.pageSize,
    currentUser?._id,
  ]);

  // Fetch tasks when filters or pagination changes
  useEffect(() => {
    fetchTasksWithFilters();
  }, [fetchTasksWithFilters, pagination.current, pagination.pageSize]);

  // Update local pagination when server pagination changes
  useEffect(() => {
    if (serverPagination) {
      console.log("sp", serverPagination);
      setPagination((prev) => ({
        ...prev,
        total: serverPagination.total || 0,
        current: serverPagination.page || 1,
        pageSize: serverPagination.limit || 10,
      }));
    }
  }, [serverPagination]);

  // Handle table change (pagination, filters, sorter)
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  // Update filters and reset to first page
  const updateFilter = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    // Reset to first page when filters change
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  }, []);

  console.log(tasks);

  useEffect(() => {
    if (currentUser?._id) dispatch(fetchTasks({ assignee: currentUser._id }));
  }, [dispatch, currentUser?._id]);

  const columns = [
    {
      title: t("Task"),
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a
          onClick={() =>
            navigate(`/tasks/${record.id}`, {
              state: { id: record.id, pathnames: ["Task", text] },
            })
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={taskStatuses[status]?.color}>
          {taskStatuses[status]?.label || status}
        </Tag>
      ),
    },
    {
      title: t("Priority"),
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag color={taskPriorities[priority]?.color}>
          {taskPriorities[priority]?.label || priority}
        </Tag>
      ),
    },
    {
      title: t("Due Date"),
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      title: t("Project"),
      dataIndex: "project",
      key: "project",
      render: (text) => text || "-",
    },
  ];

>>>>>>> origin/main
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-5"
    >
<<<<<<< HEAD
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
=======
      <Card className="!bg-transparent !border-none">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex gap-4 flex-wrap">
            <Select
              value={filters.project}
              onChange={(value) => {
                updateFilter("project", value);
              }}
              style={{ width: 180 }}
              options={projectOptions}
              placeholder={t("Select Project")}
            />
            <Select
              value={filters.status}
              onChange={(value) => updateFilter("status", value)}
              style={{ width: 180 }}
              options={[
                { value: "all", label: t("All Statuses") },
>>>>>>> origin/main
                ...Object.entries(taskStatuses).map(([key, value]) => ({
                  value: key,
                  label: value.label,
                })),
              ]}
<<<<<<< HEAD
            />
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={setPriorityFilter}
              options={[
                { value: "all", label: t("allPriorities") },
=======
              placeholder={t("Select Status")}
            />
            <Select
              value={filters.priority}
              onChange={(value) => updateFilter("priority", value)}
              style={{ width: 180 }}
              options={[
                { value: "all", label: t("All Priorities") },
>>>>>>> origin/main
                ...Object.entries(taskPriorities).map(([key, value]) => ({
                  value: key,
                  label: value.label,
                })),
              ]}
<<<<<<< HEAD
            />
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            {t("createTask")}
=======
              placeholder={t("Select Priority")}
            />
          </div>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsModalVisible(true)}
          >
            {t("Create Task")}
>>>>>>> origin/main
          </Button>
        </div>
      </Card>

<<<<<<< HEAD
      <Card variant="outlined">
        <Table
          columns={columns}
          dataSource={filteredTasks}
          rowKey="id"
          pagination={{ pageSize: 10 }}
=======
      <Card className="mt-4">
        <Table
          columns={columns}
          dataSource={mappedTasks}
          rowKey={(record) => record.id}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          rowClassName="cursor-pointer hover:bg-gray-50"
          scroll={{ x: true }}
>>>>>>> origin/main
        />
      </Card>

      <Modal
<<<<<<< HEAD
        title={t("createNewTask")}
=======
        title={t("Create New Task")}
>>>>>>> origin/main
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
<<<<<<< HEAD
      >
        <CreateTask onSuccess={handleCreateTask} />
=======
        destroyOnClose
      >
        <CreateTaskBoard
          onSuccess={() => {
            setIsModalVisible(false);
            dispatch(fetchTasks({ assignee: currentUser?._id }));
          }}
          onCancel={() => setIsModalVisible(false)}
        />
>>>>>>> origin/main
      </Modal>
    </motion.div>
  );
};

export default React.memo(TaskOverview);
