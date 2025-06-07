import React from "react";
import { Typography, Card, Divider } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  BarChartOutlined,
  BellOutlined,
  HistoryOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ProjectOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import { useMockData } from "../context/MockDataContext";
import { useLanguage } from "../context/LanguageContext";

const { Title, Text } = Typography;

const SummaryCard = ({ icon, title, description }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-center gap-4">
      <div className="text-2xl text-blue-500">{icon}</div>
      <div>
        <Text className="text-gray-500">{title}</Text>
        <div className="text-xl font-semibold">{description}</div>
      </div>
    </div>
  </Card>
);

const CardSection = ({ title, items, icon }) => (
  <Card
    title={
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
    }
    className="hover:shadow-lg transition-shadow duration-200"
  >
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <ThunderboltOutlined className="text-blue-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </Card>
);

const Home = () => {
  const { projects, tasks, users, notifications } = useMockData();
  const { t } = useLanguage();

  // Calculate summary statistics
  const ongoingProjects = projects.filter(
    (p) => p.status === "in-progress",
  ).length;
  const completedTasksToday = tasks.filter((t) => {
    const today = new Date().toISOString().split("T")[0];
    return t.status === "completed" && t.dueDate === today;
  }).length;
  const activeMembers = users.length;
  const recentNotifications = notifications.slice(0, 2);

  // Get today's tasks
  const todayTasks = tasks.filter((task) => {
    const today = new Date().toISOString().split("T")[0];
    return task.dueDate === today;
  });

  // Get recent activities
  const recentActivities = [
    ...recentNotifications.map((notif) => notif.message),
    ...todayTasks.map((task) => `Due today: ${task.title}`),
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 mx-auto space-y-12 w-full max-w-7xl">
        {/* Welcome Message */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Title
            level={2}
            className="!text-3xl !text-[var(--color-text-primary)] font-semibold mb-2"
          >
            {t("welcomeBack")}, {users[0].fullName} 👋
          </Title>
          <Text
            type="secondary"
            className="!text-[var(--color-text-secondary)]"
          >
            {t("quickOverview")}
          </Text>
        </Motion.div>

        {/* Dashboard Summary */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <SummaryCard
            icon={<ProjectOutlined />}
            title={t("projects")}
            description={`${ongoingProjects} ${t("ongoing")}`}
          />
          <SummaryCard
            icon={<CheckCircleOutlined />}
            title={t("completedTasks")}
            description={`${completedTasksToday} ${t("today")}`}
          />
          <SummaryCard
            icon={<TeamOutlined />}
            title={t("activeMembers")}
            description={`${activeMembers} ${t("members")}`}
          />
          <SummaryCard
            icon={<BarChartOutlined />}
            title={t("reports")}
            description={`2 ${t("generated")}`}
          />
        </Motion.div>

        {/* Schedule */}
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 gap-6"
        >
          <CardSection
            title={t("todaySchedule")}
            items={todayTasks.map((task) => `${task.dueDate} – ${task.title}`)}
            icon={<CalendarOutlined />}
          />
        </Motion.div>

        {/* Recent Activity */}
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CardSection
            title={t("recentActivity")}
            items={recentActivities}
            icon={<HistoryOutlined />}
          />
        </Motion.div>

        {/* Quote */}
        <Motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center pt-8"
        >
          <Divider />
          <div className="inline-flex items-center justify-center gap-2 !text-[var(--color-text-secondary)] text-base italic">
            <SmileOutlined />
            <span>{t("quote")}</span>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default Home;
