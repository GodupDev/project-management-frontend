import React, { useState } from "react";
import {
  Table,
  Input,
  DatePicker,
  Button,
  Space,
  Tooltip,
  message,
  Tag,
  Card,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  ReloadOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import dayjs from "dayjs";
import { useLanguage } from "../context/LanguageContext";

const { RangePicker } = DatePicker;

const WorkLogs = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showFilters, setShowFilters] = useState(false);

  // Hardcoded data
  const worklogs = [
    {
      id: 1,
      projectName: "Project Management System",
      projectStatus: "active",
      taskName: "Implement user authentication",
      taskStatus: "completed",
      userId: "user1",
      userName: "John Doe",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      description: "Added JWT authentication and user registration",
      hours: 3.5,
      date: "2024-03-15T09:00:00",
    },
    {
      id: 2,
      projectName: "E-commerce Platform",
      projectStatus: "active",
      taskName: "Design dashboard layout",
      taskStatus: "inProgress",
      userId: "user2",
      userName: "Jane Smith",
      userAvatar: "https://i.pravatar.cc/150?img=2",
      description: "Created responsive dashboard components",
      hours: 4.0,
      date: "2024-03-15T13:00:00",
    },
    {
      id: 3,
      projectName: "Mobile App Development",
      projectStatus: "active",
      taskName: "Write API documentation",
      taskStatus: "completed",
      userId: "user3",
      userName: "Mike Johnson",
      userAvatar: "https://i.pravatar.cc/150?img=3",
      description: "Documented REST API endpoints",
      hours: 2.5,
      date: "2024-03-14T10:00:00",
    },
  ];

  // Calculate statistics
  const totalHours = worklogs.reduce((sum, log) => sum + log.hours, 0);
  const uniqueUsers = new Set(worklogs.map((log) => log.userId)).size;
  const completedTasks = worklogs.filter(
    (log) => log.taskStatus === "completed",
  ).length;

  // Filter logs based on search and date range
  const filteredLogs = worklogs.filter((log) => {
    const matchesSearch = Object.values(log).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const matchesDateRange =
      (!dateRange[0] ||
        dayjs(log.date).isSameOrAfter(dayjs(dateRange[0]), "day")) &&
      (!dateRange[1] ||
        dayjs(log.date).isSameOrBefore(dayjs(dateRange[1]), "day"));

    return matchesSearch && matchesDateRange;
  });

  const columns = [
    {
      title: t("project"),
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          <Tag color={record.projectStatus === "active" ? "green" : "blue"}>
            {t(record.projectStatus)}
          </Tag>
        </Space>
      ),
    },
    {
      title: t("task"),
      dataIndex: "taskName",
      key: "taskName",
      sorter: (a, b) => a.taskName.localeCompare(b.taskName),
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          <Tag color={record.taskStatus === "completed" ? "green" : "orange"}>
            {t(record.taskStatus)}
          </Tag>
        </Space>
      ),
    },
    {
      title: t("user"),
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      render: (text, record) => (
        <Space>
          {record.userAvatar && (
            <img
              src={record.userAvatar}
              alt={text}
              className="w-6 h-6 rounded-full"
            />
          )}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: t("description"),
      dataIndex: "description",
      key: "description",
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: t("createdAt"),
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => dayjs(date).format("MMM DD, YYYY HH:mm"),
    },
  ];

  return (
    <Motion.div
      className="m-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6 ">
        <Space>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => message.info(t("exportComingSoon"))}
          >
            {t("export")}
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              setSearchTerm("");
              setDateRange([null, null]);
            }}
          >
            {t("reset")}
          </Button>
        </Space>
      </div>

      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card>
            <Statistic
              title={t("totalHours")}
              value={totalHours}
              precision={1}
              prefix={<ClockCircleOutlined />}
              suffix="h"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={t("activeUsers")}
              value={uniqueUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={t("completedTasks")}
              value={completedTasks}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="mb-6">
        <Space className="w-full">
          <Input
            placeholder={t("searchWorkLogs")}
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {t("filters")}
          </Button>
        </Space>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <Space>
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
