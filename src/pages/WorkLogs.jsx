import React, { useState } from "react";
import {
  Table,
  Input,
  Select,
  DatePicker,
  Button,
  Tag,
  Space,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data
const mockWorkLogs = [
  {
    id: 1,
    project: "Website Redesign",
    task: "Update Homepage",
    user: "John Doe",
    date: "2024-03-15",
    hours: 4,
    status: "completed",
    description: "Updated homepage layout and content",
    priority: "high",
  },
  {
    id: 2,
    project: "Mobile App",
    task: "Fix Login Bug",
    user: "Jane Smith",
    date: "2024-03-14",
    hours: 2,
    status: "in_progress",
    description: "Fixed authentication issue",
    priority: "medium",
  },
  {
    id: 3,
    project: "API Development",
    task: "Create Endpoints",
    user: "Mike Johnson",
    date: "2024-03-13",
    hours: 6,
    status: "completed",
    description: "Implemented new API endpoints",
    priority: "high",
  },
  {
    id: 4,
    project: "Database Migration",
    task: "Data Transfer",
    user: "Sarah Wilson",
    date: "2024-03-12",
    hours: 8,
    status: "completed",
    description: "Migrated data to new database",
    priority: "low",
  },
  {
    id: 5,
    project: "UI/UX Design",
    task: "Create Mockups",
    user: "Alex Brown",
    date: "2024-03-11",
    hours: 5,
    status: "in_progress",
    description: "Created new design mockups",
    priority: "medium",
  },
  {
    id: 6,
    project: "Website Redesign",
    task: "Update Homepage",
    user: "John Doe",
    date: "2024-03-15",
    hours: 4,
    status: "completed",
    description: "Updated homepage layout and content",
    priority: "high",
  },
  {
    id: 7,
    project: "Mobile App",
    task: "Fix Login Bug",
    user: "Jane Smith",
    date: "2024-03-14",
    hours: 2,
    status: "in_progress",
    description: "Fixed authentication issue",
    priority: "medium",
  },
  {
    id: 8,
    project: "API Development",
    task: "Create Endpoints",
    user: "Mike Johnson",
    date: "2024-03-13",
    hours: 6,
    status: "completed",
    description: "Implemented new API endpoints",
    priority: "high",
  },
];

const statusColors = {
  completed: "green",
  in_progress: "orange",
  default: "default",
};

const priorityColors = {
  high: "red",
  medium: "gold",
  low: "green",
  default: "default",
};

const WorkLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showFilters, setShowFilters] = useState(false);

  const uniqueUsers = [...new Set(mockWorkLogs.map((log) => log.user))];

  // Filter logs based on filters
  const filteredLogs = mockWorkLogs.filter((log) => {
    const matchesSearch = Object.values(log).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || log.priority === priorityFilter;
    const matchesUser = userFilter === "all" || log.user === userFilter;
    const matchesDateRange =
      (!dateRange[0] ||
        dayjs(log.date).isSameOrAfter(dayjs(dateRange[0]), "day")) &&
      (!dateRange[1] ||
        dayjs(log.date).isSameOrBefore(dayjs(dateRange[1]), "day"));

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesUser &&
      matchesDateRange
    );
  });

  const columns = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      defaultSortOrder: "descend",
    },
    {
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
      sorter: (a, b) => a.hours - b.hours,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag color={priorityColors[priority] || "default"} key={priority}>
          {priority.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "High", value: "high" },
        { text: "Medium", value: "medium" },
        { text: "Low", value: "low" },
      ],
      onFilter: (value, record) => record.priority === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status] || "default"} key={status}>
          {status.replace("_", " ").toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Completed", value: "completed" },
        { text: "In Progress", value: "in_progress" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <Motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className=" p-4"
    >
      <div className="flex justify-between items-center">
        <Input
          size="large"
          placeholder="Search work logs..."
          prefix={<SearchOutlined className="mr-2" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          className="max-w-lg"
        />
        <Space>
          <Tooltip title="Refresh">
            <Button
              icon={<ReloadOutlined />}
              type="primary"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setPriorityFilter("all");
                setUserFilter("all");
                setDateRange([null, null]);
              }}
            />
          </Tooltip>
          <Tooltip title="Export">
            <Button icon={<DownloadOutlined />} type="primary" />
          </Tooltip>
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </Space>
      </div>

      <div className="mb-4"></div>

      {showFilters && (
        <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
          <Space wrap size="large">
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ minWidth: 160 }}
              placeholder="Select Status"
            >
              <Option value="all">All Status</Option>
              <Option value="completed">Completed</Option>
              <Option value="in_progress">In Progress</Option>
            </Select>

            <Select
              value={priorityFilter}
              onChange={setPriorityFilter}
              style={{ minWidth: 160 }}
              placeholder="Select Priority"
            >
              <Option value="all">All Priorities</Option>
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>

            <Select
              value={userFilter}
              onChange={setUserFilter}
              style={{ minWidth: 160 }}
              placeholder="Select User"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="all">All Users</Option>
              {uniqueUsers.map((user) => (
                <Option key={user} value={user}>
                  {user}
                </Option>
              ))}
            </Select>

            <RangePicker
              value={dateRange[0] && dateRange[1] ? dateRange : []}
              onChange={(dates) => {
                if (!dates) {
                  setDateRange([null, null]);
                } else {
                  setDateRange(dates);
                }
              }}
              allowClear
              style={{ minWidth: 200 }}
            />
          </Space>
        </div>
      )}

      <Table
        dataSource={filteredLogs}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        className="bg-white rounded-lg shadow"
      />
    </Motion.div>
  );
};

export default WorkLogs;
