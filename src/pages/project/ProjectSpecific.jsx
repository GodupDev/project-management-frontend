import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Tag,
  Button,
  Select,
  DatePicker,
  Input,
  Space,
  message,
  Divider,
  Row,
  Col,
  Avatar,
  Tooltip,
  Progress,
} from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  TagOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMockData } from "../../context/MockDataContext";
import { useLanguage } from "../../context/LanguageContext";
import TaskBoard from "../../components/ui/task/TaskBoard";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function ProjectSpecific() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state?.projectData;
  const { projects, tasks, users, updateProjects } = useMockData();
  const { t } = useLanguage();

  const [project, setProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState(null);

  const projectStatuses = [
    t("inProgress"),
    t("completed"),
    t("onHold"),
    t("cancelled"),
  ];

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
      setEditedProject({ ...projectData });
    } else {
      const foundProject = projects.find((p) => p.name === projectName);
      if (foundProject) {
        setProject(foundProject);
        setEditedProject({ ...foundProject });
      }
    }
  }, [projectData, projectName, projects]);

  useEffect(() => {
    // Filter tasks for this project
    const projectTasks = tasks.filter((t) => t.project.id === project?.id);
    setProjectTasks(projectTasks);
  }, [project, tasks]);

  const handleChange = (field, value) => {
    setEditedProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const updatedProjects = projects.map((p) =>
      p.id === editedProject.id ? editedProject : p,
    );
    updateProjects(updatedProjects);
    setProject(editedProject);
    setEditMode(false);
    message.success(t("projectUpdatedSuccess"));
  };

  const handleTaskClick = (task) => {
    navigate(`/projects/${projectName}/${task.name}`, {
      state: { taskData: task },
    });
  };

  if (!project) {
    return (
      <Card style={{ maxWidth: 700, margin: "auto", marginTop: 50 }}>
        <Text type="danger">{t("projectNotFound")}</Text>
        <Button type="link" onClick={() => navigate("/projects")}>
          {t("backToList")}
        </Button>
      </Card>
    );
  }

  return (
    <div className="p-5 mx-auto space-y-8">
      <Card
        title={
          <Space>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/projects")}
            />
            {editMode ? t("editProject") : t("projectDetails")}
          </Space>
        }
        extra={
          editMode ? (
            <>
              <Button
                onClick={() => {
                  setEditMode(false);
                  setEditedProject({ ...project });
                }}
                style={{ marginRight: 8 }}
              >
                {t("cancel")}
              </Button>
              <Button type="primary" onClick={handleSave}>
                {t("save")}
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)} type="primary" ghost>
              {t("edit")}
            </Button>
          )
        }
      >
        {/* Project Name */}
        <div>
          <Title level={4}>{t("projectName")}</Title>
          {!editMode ? (
            <Text strong style={{ fontSize: 16 }}>
              {project.name}
            </Text>
          ) : (
            <Input
              value={editedProject.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={t("projectName")}
              autoFocus
            />
          )}
        </div>

        <Divider />

        {/* Description */}
        <div>
          <Title level={4}>{t("description")}</Title>
          {!editMode ? (
            <Paragraph style={{ whiteSpace: "pre-wrap" }}>
              {project.description || t("noDescription")}
            </Paragraph>
          ) : (
            <TextArea
              rows={5}
              value={editedProject.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder={t("projectDescriptionPlaceholder")}
            />
          )}
        </div>

        <Divider />

        <Row gutter={[24, 24]}>
          {/* Project Manager */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <UserOutlined /> {t("projectManager")}
            </Title>
            {!editMode ? (
              <Avatar.Group max={{ count: 3 }}>
                {project.managers?.map((manager) => (
                  <Tooltip
                    key={`manager-${manager?.id || "unknown"}`}
                    title={manager?.fullName || t("unknown")}
                  >
                    <Avatar
                      src={manager?.avatar}
                      icon={!manager?.avatar && <UserOutlined />}
                    >
                      {!manager?.avatar && (manager?.fullName?.[0] || "?")}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            ) : (
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder={t("selectManagers")}
                value={
                  editedProject.managers?.map((m) => m?.id).filter(Boolean) ||
                  []
                }
                onChange={(ids) =>
                  handleChange(
                    "managers",
                    ids
                      .map((id) => users.find((u) => u.id === id))
                      .filter(Boolean),
                  )
                }
              >
                {users.map((user) => (
                  <Option key={`user-${user.id}`} value={user.id}>
                    {user.fullName}
                  </Option>
                ))}
              </Select>
            )}
          </Col>

          {/* Status */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <TagOutlined /> {t("status")}
            </Title>
            {!editMode ? (
              <Tag
                color={
                  project.status === t("completed")
                    ? "green"
                    : project.status === t("inProgress")
                    ? "blue"
                    : project.status === t("onHold")
                    ? "orange"
                    : project.status === t("cancelled")
                    ? "red"
                    : "default"
                }
              >
                {project.status}
              </Tag>
            ) : (
              <Select
                value={editedProject.status}
                onChange={(val) => handleChange("status", val)}
                style={{ width: "100%" }}
              >
                {projectStatuses.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            )}
          </Col>

          {/* Start Date */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <ClockCircleOutlined /> {t("startDate")}
            </Title>
            {!editMode ? (
              <Text>
                {project.startDate
                  ? moment(project.startDate).format("DD/MM/YYYY")
                  : t("notSpecified")}
              </Text>
            ) : (
              <DatePicker
                value={
                  editedProject.startDate
                    ? moment(editedProject.startDate)
                    : null
                }
                onChange={(date) =>
                  handleChange("startDate", date ? date.toISOString() : null)
                }
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            )}
          </Col>

          {/* Expected End Date */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <ClockCircleOutlined /> {t("expectedEndDate")}
            </Title>
            {!editMode ? (
              <Text>
                {project.expectedEndDate
                  ? moment(project.expectedEndDate).format("DD/MM/YYYY")
                  : t("notSpecified")}
              </Text>
            ) : (
              <DatePicker
                value={
                  editedProject.expectedEndDate
                    ? moment(editedProject.expectedEndDate)
                    : null
                }
                onChange={(date) =>
                  handleChange(
                    "expectedEndDate",
                    date ? date.toISOString() : null,
                  )
                }
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            )}
          </Col>
        </Row>

        <Divider />

        {/* Task List */}
        <div>
          <Title level={4}>{t("tasks")}</Title>
          <TaskBoard
            tasks={projectTasks}
            onTaskClick={handleTaskClick}
            projectId={project.id}
          />
        </div>
      </Card>
    </div>
  );
}
