import React from "react";
import { Table, Progress, Card, Row, Col, Statistic } from "antd";
import { motion as Motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const projectsData = [
  {
    key: "1",
    name: "Project Alpha",
    status: "In Progress",
    progress: 75,
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    manager: "John Doe",
    completedTasks: 30,
    overdueTasks: 2,
  },
  {
    key: "2",
    name: "Project Beta",
    status: "Completed",
    progress: 100,
    startDate: "2024-05-15",
    endDate: "2024-12-31",
    manager: "Jane Smith",
    completedTasks: 50,
    overdueTasks: 0,
  },
  {
    key: "3",
    name: "Project Gamma",
    status: "Delayed",
    progress: 40,
    startDate: "2025-03-01",
    endDate: "2025-09-30",
    manager: "Alice",
    completedTasks: 15,
    overdueTasks: 5,
  },
];

// Tổng số task mỗi trạng thái (giả lập)
const taskStatusData = [
  { name: "Completed", value: 95 },
  { name: "In Progress", value: 40 },
  { name: "Overdue", value: 7 },
  { name: "Open", value: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28"];

const columns = [
  { title: "Project Name", dataIndex: "name", key: "name" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Progress",
    dataIndex: "progress",
    key: "progress",
    render: (value) => <Progress percent={value} size="small" />,
  },
  { title: "Start Date", dataIndex: "startDate", key: "startDate" },
  { title: "End Date", dataIndex: "endDate", key: "endDate" },
  { title: "Manager", dataIndex: "manager", key: "manager" },
  {
    title: "Completed Tasks",
    dataIndex: "completedTasks",
    key: "completedTasks",
  },
  { title: "Overdue Tasks", dataIndex: "overdueTasks", key: "overdueTasks" },
];

// Giả lập dữ liệu tiến độ theo tháng (Line chart)
const monthlyProgressData = [
  { month: "Jan", progress: 30 },
  { month: "Feb", progress: 45 },
  { month: "Mar", progress: 50 },
  { month: "Apr", progress: 65 },
  { month: "May", progress: 70 },
  { month: "Jun", progress: 85 },
  { month: "Jul", progress: 90 },
];

export default function PerformancePage() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: 24 }}
    >
      {/* Tổng quan số liệu */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Projects" value={projectsData.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completed Tasks"
              value={projectsData.reduce(
                (acc, cur) => acc + cur.completedTasks,
                0,
              )}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Overdue Tasks"
              value={projectsData.reduce(
                (acc, cur) => acc + cur.overdueTasks,
                0,
              )}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Average Progress"
              value={`${Math.round(
                projectsData.reduce((acc, cur) => acc + cur.progress, 0) /
                  projectsData.length,
              )}%`}
            />
          </Card>
        </Col>
      </Row>

      {/* Bảng chi tiết dự án */}
      <Card title="Project Performance Overview" style={{ marginBottom: 24 }}>
        <Table columns={columns} dataSource={projectsData} pagination={false} />
      </Card>

      {/* Biểu đồ cột tiến độ từng project */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="Progress per Project (Bar Chart)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={projectsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Biểu đồ tròn trạng thái task */}
        <Col xs={24} md={12}>
          <Card title="Task Status Distribution (Pie Chart)">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ đường tiến độ theo tháng */}
      <Card title="Monthly Average Progress (Line Chart)">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthlyProgressData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#82ca9d"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Motion.div>
  );
}
