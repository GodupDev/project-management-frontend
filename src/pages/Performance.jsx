import React from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Table,
  Tag,
  Typography,
  Select,
  DatePicker,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useLanguage } from "../context/LanguageContext";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28"];

// Hardcoded data
const performanceData = {
  overview: {
    totalTasks: 156,
    completedTasks: 98,
    inProgressTasks: 45,
    overdueTasks: 13,
    completionRate: 62.8,
    averageCompletionTime: 4.2,
  },
  taskStatus: [
    { name: "Completed", value: 98 },
    { name: "In Progress", value: 45 },
    { name: "Overdue", value: 13 },
  ],
  monthlyProgress: [
    { month: "Jan", completed: 65, target: 80 },
    { month: "Feb", completed: 59, target: 75 },
    { month: "Mar", completed: 80, target: 85 },
    { month: "Apr", completed: 81, target: 90 },
    { month: "May", completed: 56, target: 85 },
    { month: "Jun", completed: 55, target: 80 },
  ],
  teamPerformance: [
    {
      key: "1",
      name: "John Doe",
      completed: 25,
      inProgress: 8,
      overdue: 2,
      efficiency: 92,
    },
    {
      key: "2",
      name: "Jane Smith",
      completed: 30,
      inProgress: 5,
      overdue: 1,
      efficiency: 95,
    },
    {
      key: "3",
      name: "Mike Johnson",
      completed: 20,
      inProgress: 10,
      overdue: 3,
      efficiency: 88,
    },
    {
      key: "4",
      name: "Sarah Williams",
      completed: 28,
      inProgress: 7,
      overdue: 2,
      efficiency: 90,
    },
  ],
  recentActivity: [
    {
      key: "1",
      task: "Design Homepage",
      user: "John Doe",
      action: "completed",
      time: "2 hours ago",
    },
    {
      key: "2",
      task: "Implement Authentication",
      user: "Jane Smith",
      action: "started",
      time: "3 hours ago",
    },
    {
      key: "3",
      task: "Database Migration",
      user: "Mike Johnson",
      action: "updated",
      time: "5 hours ago",
    },
  ],
};

const Performance = () => {
  const { t } = useLanguage();

  const columns = [
    {
      title: t("perfName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("perfCompleted"),
      dataIndex: "completed",
      key: "completed",
      render: (text) => <Tag color="success">{text}</Tag>,
    },
    {
      title: t("perfInProgress"),
      dataIndex: "inProgress",
      key: "inProgress",
      render: (text) => <Tag color="processing">{text}</Tag>,
    },
    {
      title: t("perfOverdue"),
      dataIndex: "overdue",
      key: "overdue",
      render: (text) => <Tag color="error">{text}</Tag>,
    },
    {
      title: t("perfEfficiency"),
      dataIndex: "efficiency",
      key: "efficiency",
      render: (text) => (
        <Progress
          percent={text}
          size="small"
          status={text >= 90 ? "success" : text >= 80 ? "normal" : "exception"}
        />
      ),
    },
  ];

  const activityColumns = [
    {
      title: t("perfTask"),
      dataIndex: "task",
      key: "task",
    },
    {
      title: t("perfUser"),
      dataIndex: "user",
      key: "user",
    },
    {
      title: t("perfAction"),
      dataIndex: "action",
      key: "action",
      render: (text) => {
        const colors = {
          completed: "success",
          started: "processing",
          updated: "warning",
        };
        const icons = {
          completed: <CheckCircleOutlined />,
          started: <ClockCircleOutlined />,
          updated: <ClockCircleOutlined />,
        };
        return (
          <Tag color={colors[text]} icon={icons[text]}>
            {t(`perf${text.charAt(0).toUpperCase() + text.slice(1)}`)}
          </Tag>
        );
      },
    },
    {
      title: t("perfTime"),
      dataIndex: "time",
      key: "time",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>{t("perfTitle")}</Title>
        <div className="flex gap-4">
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            options={[
              { value: "all", label: t("perfAllTime") },
              { value: "month", label: t("perfThisMonth") },
              { value: "week", label: t("perfThisWeek") },
            ]}
          />
          <RangePicker />
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t("perfTotalTasks")}
              value={performanceData.overview.totalTasks}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t("perfCompletionRate")}
              value={performanceData.overview.completionRate}
              precision={1}
              suffix="%"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t("perfAvgCompletionTime")}
              value={performanceData.overview.averageCompletionTime}
              suffix="days"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t("perfOverdueTasks")}
              value={performanceData.overview.overdueTasks}
              valueStyle={{ color: "#cf1322" }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} lg={12}>
          <Card title={t("perfTaskStatus")}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData.taskStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {performanceData.taskStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={t("perfMonthlyProgress")}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData.monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="completed"
                  fill="#8884d8"
                  name={t("perfCompleted")}
                />
                <Bar dataKey="target" fill="#82ca9d" name={t("perfTarget")} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} lg={16}>
          <Card title={t("perfTeamPerformance")}>
            <Table
              columns={columns}
              dataSource={performanceData.teamPerformance}
              pagination={false}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={t("perfRecentActivity")}>
            <Table
              columns={activityColumns}
              dataSource={performanceData.recentActivity}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Performance;
