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
import { useMockData } from "../context/MockDataContext";

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

const Performance = () => {
  const { projects, tasks, users } = useMockData();

  // Map project data for the table
  const projectsData = projects.map((project) => {
    const projectTasks = tasks.filter((task) => task.project.id === project.id);
    const completedTasks = projectTasks.filter(
      (task) => task.status === "completed",
    ).length;
    const overdueTasks = projectTasks.filter((task) => {
      const dueDate = new Date(task.deadline);
      const today = new Date();
      return task.status !== "completed" && dueDate < today;
    }).length;

    return {
      key: project.id,
      name: project.name,
      status: project.status,
      progress: project.progress,
      startDate: project.startDate,
      endDate: project.endDate,
      manager:
        project.members.find((member) => member.role === "Project Manager")
          ?.user.fullName || "Unknown",
      completedTasks,
      overdueTasks,
    };
  });

  // Calculate task status distribution
  const taskStatusData = [
    {
      name: "Completed",
      value: tasks.filter((task) => task.status === "completed").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((task) => task.status === "in-progress").length,
    },
    {
      name: "Overdue",
      value: tasks.filter((task) => {
        const dueDate = new Date(task.deadline);
        const today = new Date();
        return task.status !== "completed" && dueDate < today;
      }).length,
    },
    {
      name: "Open",
      value: tasks.filter((task) => task.status === "todo").length,
    },
  ];

  // Calculate monthly progress data
  const monthlyProgressData = projects.reduce((acc, project) => {
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    const months = [];

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const month = currentDate.toLocaleString("default", { month: "short" });
      const existingMonth = acc.find((item) => item.month === month);

      if (existingMonth) {
        existingMonth.progress =
          (existingMonth.progress + project.progress) / 2;
      } else {
        acc.push({ month, progress: project.progress });
      }

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return acc;
  }, []);

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Summary Statistics */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Projects" value={projects.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completed Tasks"
              value={tasks.filter((task) => task.status === "completed").length}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Overdue Tasks"
              value={
                tasks.filter((task) => {
                  const dueDate = new Date(task.deadline);
                  const today = new Date();
                  return task.status !== "completed" && dueDate < today;
                }).length
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Average Progress"
              value={`${Math.round(
                projects.reduce((acc, cur) => acc + cur.progress, 0) /
                  projects.length,
              )}%`}
            />
          </Card>
        </Col>
      </Row>

      {/* Project Performance Table */}
      <Card title="Project Performance Overview" style={{ marginBottom: 24 }}>
        <Table columns={columns} dataSource={projectsData} pagination={false} />
      </Card>

      {/* Task Status Distribution */}
      <Card title="Task Status Distribution" style={{ marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={taskStatusData}
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
              {taskStatusData.map((entry, index) => (
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

      {/* Monthly Progress Chart */}
      <Card title="Monthly Progress" style={{ marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyProgressData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#8884d8"
              name="Progress"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Motion.div>
  );
};

export default Performance;
