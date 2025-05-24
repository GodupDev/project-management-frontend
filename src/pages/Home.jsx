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

const { Title, Text } = Typography;

export default function Home() {
  return (
    <div className="p-4 mx-auto space-y-12">
      {/* Welcome Message */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Title level={2} className="!text-3xl">
          Welcome back, Tien 👋
        </Title>
        <Text type="secondary" className="text-gray-500">
          Here’s a quick overview of your day
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
          title="Projects"
          description="8 ongoing"
        />
        <SummaryCard
          icon={<CheckCircleOutlined />}
          title="Completed Tasks"
          description="5 today"
        />
        <SummaryCard
          icon={<TeamOutlined />}
          title="Active Members"
          description="12 members"
        />
        <SummaryCard
          icon={<BarChartOutlined />}
          title="Reports"
          description="2 generated"
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
          title="Today's Schedule"
          items={[
            "09:00 – Weekly Meeting",
            "14:00 – Submit Design Draft",
            "17:30 – Code Review Session",
          ]}
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
          title="Recent Activity"
          items={["Edited: “Homepage Revamp”", "Commented: “Sprint Plan”"]}
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
        <div className="inline-flex items-center justify-center gap-2 text-gray-600 text-base italic">
          <SmileOutlined />
          <span>
            “The best way to get started is to quit talking and begin doing.” –
            Walt Disney
          </span>
        </div>
      </Motion.div>
    </div>
  );
}

// Summary Card
function SummaryCard({ icon, title, description }) {
  return (
    <Card className="rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur">
      <Text strong className="flex items-center gap-2 text-lg text-gray-800">
        {icon} {title}
      </Text>
      <div className="mt-2 text-gray-600 text-sm">{description}</div>
    </Card>
  );
}

// Section Card
function CardSection({ title, items, icon }) {
  return (
    <Card className="rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur">
      <Text strong className="text-lg flex items-center gap-2 text-gray-800">
        {icon} {title}
      </Text>
      <div className="mt-4 space-y-2 text-gray-600 text-sm pl-1">
        {items.map((item, idx) => (
          <div key={idx} className="ml-2">
            • {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
