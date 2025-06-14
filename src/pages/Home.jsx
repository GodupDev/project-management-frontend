import React from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  List,
  Avatar,
  Tag,
  Typography,
} from "antd";
import {
  ProjectOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
const { Title, Text } = Typography;

const Home = () => {
  const { t } = useLanguage();

  // Hardcoded data
  const stats = {
    totalProjects: 8,
    completedProjects: 4,
    inProgressProjects: 3,
    totalTasks: 32,
    completedTasks: 20,
    teamMembers: 6,
  };

  const recentProjects = [
    {
      id: 1,
      name: "Website Redesign",
      progress: 65,
      status: "in_progress",
      team: [
        { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
        {
          id: 2,
          name: "Jane Smith",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
      ],
    },
    {
      id: 2,
      name: "Mobile App Launch",
      progress: 100,
      status: "completed",
      team: [
        {
          id: 3,
          name: "Mike Johnson",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
      ],
    },
    {
      id: 3,
      name: "Marketing Campaign",
      progress: 40,
      status: "in_progress",
      team: [
        {
          id: 4,
          name: "Emily Brown",
          avatar: "https://i.pravatar.cc/150?img=4",
        },
      ],
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Design Homepage",
      project: "Website Redesign",
      assignee: "Jane Smith",
      dueDate: "2024-03-15",
      status: "in_progress",
    },
    {
      id: 2,
      title: "Implement Authentication",
      project: "Website Redesign",
      assignee: "Mike Johnson",
      dueDate: "2024-03-20",
      status: "todo",
    },
    {
      id: 3,
      title: "Create Database Schema",
      project: "Website Redesign",
      assignee: "Mike Johnson",
      dueDate: "2024-03-10",
      status: "done",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "in_progress":
        return "blue";
      case "todo":
        return "orange";
      case "done":
        return "green";
      default:
        return "default";
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-8">
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic
                title={t("totalProjects")}
                value={stats.totalProjects}
                prefix={<ProjectOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title={t("completedProjects")}
                value={stats.completedProjects}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title={t("inProgressProjects")}
                value={stats.inProgressProjects}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Card title={t("recentProjects")} extra={<TeamOutlined />}>
              <List
                itemLayout="horizontal"
                dataSource={recentProjects}
                renderItem={(project) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<ProjectOutlined style={{ fontSize: 24 }} />}
                      title={project.name}
                      description={
                        <>
                          <Progress percent={project.progress} size="small" />
                          <div>
                            {project.team.map((member) => (
                              <Avatar
                                key={member.id}
                                src={member.avatar}
                                size="small"
                                style={{ marginRight: 4 }}
                              />
                            ))}
                          </div>
                        </>
                      }
                    />
                    <Tag color={getStatusColor(project.status)}>
                      {t(project.status)}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("recentTasks")} extra={<FileTextOutlined />}>
              <List
                itemLayout="horizontal"
                dataSource={recentTasks}
                renderItem={(task) => (
                  <List.Item>
                    <List.Item.Meta
                      title={task.title}
                      description={
                        <>
                          <Text type="secondary">{task.project}</Text>
                          <br />
                          <Text>
                            {t("assignee")}: {task.assignee}
                          </Text>
                          <br />
                          <Text>
                            {t("dueDate")}: {task.dueDate}
                          </Text>
                        </>
                      }
                    />
                    <Tag color={getStatusColor(task.status)}>
                      {t(task.status)}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Motion.div>
  );
};

export default Home;
