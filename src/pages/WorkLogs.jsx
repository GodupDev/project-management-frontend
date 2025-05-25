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
import { useMockData } from "../context/MockDataContext";

const { RangePicker } = DatePicker;

const WorkLogs = () => {
  const { worklogs } = useMockData();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showFilters, setShowFilters] = useState(false);

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
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          <Tag color={record.projectStatus === "active" ? "green" : "blue"}>
            {record.projectStatus}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Task",
      dataIndex: "taskName",
      key: "taskName",
      sorter: (a, b) => a.taskName.localeCompare(b.taskName),
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          <Tag color={record.taskStatus === "completed" ? "green" : "orange"}>
            {record.taskStatus}
          </Tag>
        </Space>
      ),
    },
    {
      title: "User",
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
      title: "Description",
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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
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
            onClick={() => message.info("Export functionality coming soon")}
          >
            Export
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              setSearchTerm("");
              setDateRange([null, null]);
            }}
          >
            Reset
          </Button>
        </Space>
      </div>

      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Hours"
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
              title="Active Users"
              value={uniqueUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Completed Tasks"
              value={completedTasks}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="mb-6">
        <Space className="w-full">
          <Input
            placeholder="Search work logs..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
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
