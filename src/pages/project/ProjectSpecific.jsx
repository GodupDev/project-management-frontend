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
} from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ClockCircleOutlined,
  TagOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import TaskBoard from "../../components/ui/task/TaskBoard";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../store/slices/userSlice";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function ProjectSpecific() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state?.projectData;
  const { t } = useLanguage();

  // Lấy users từ redux store
  const users = useSelector((state) => state.users?.list || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Mock projects và tasks (có thể thay bằng lấy từ backend nếu có)
  const projects = [
    {
      id: 1,
      name: "abc",
      description: "Redesign the marketing website.",
      status: t("inProgress"),
      startDate: "2024-06-01T00:00:00Z",
      expectedEndDate: "2024-07-01T00:00:00Z",
      managers: [], // sẽ set lại bên dưới
    },
  ];

  const tasks = [
    {
      id: 1,
      name: "Wireframes",
      project: { id: 1 },
      status: "Todo",
    },
    {
      id: 2,
      name: "UI Design",
      project: { id: 1 },
      status: "In Progress",
    },
  ];

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

  // Khi users đã có, set managers cho project nếu cần
  useEffect(() => {
    if (projectData) {
      // Nếu projectData.managers là mảng id, map sang user object
      let managers = [];
      if (Array.isArray(projectData.managers) && typeof projectData.managers[0] !== "object") {
        managers = projectData.managers
          .map((id) => users.find((u) => u._id === id))
          .filter(Boolean);
      } else {
        managers = projectData.managers || [];
      }
      setProject({ ...projectData, managers });
      setEditedProject({ ...projectData, managers });
    } else {
      const foundProject = projects.find((p) => p.name === projectName);
      setProject(foundProject);
      setEditedProject({ ...foundProject });
    }
  }, [projectData, projectName, users]);

  useEffect(() => {
    const filteredTasks = tasks.filter((t) => t.project.id === project?.id);
    setProjectTasks(filteredTasks);
  }, [project]);

  const handleChange = (field, value) => {
    setEditedProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Cập nhật managers là object user
    const updatedManagers = (editedProject.managers || [])
      .map((id) => users.find((u) => u._id === id) || id)
      .filter(Boolean);
    const updatedProject = { ...editedProject, managers: updatedManagers };
    setProject(updatedProject);
    setEditMode(false);
    message.success(t("projectUpdatedSuccess"));
    // Nếu có backend thì gọi API update ở đây
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
          <Col xs={24} sm={12}>
            <Title level={5}>
              <UserOutlined /> {t("projectManager")}
            </Title>
            {!editMode ? (
              <Avatar.Group max={{ count: 3 }}>
                {(project.managers || []).map((manager) => (
                  <Tooltip
                    key={`manager-${manager?._id || manager?.id || "unknown"}`}
                    title={manager?.fullName || manager?.username || manager?.name || t("unknown")}
                  >
                    <Avatar
                      src={manager?.avatar}
                      icon={!manager?.avatar && <UserOutlined />}
                    >
                      {!manager?.avatar && (manager?.fullName?.[0] || manager?.username?.[0] || manager?.name?.[0] || "?")}
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
                  (editedProject.managers || [])
                    .map((m) => m?._id || m?.id)
                    .filter(Boolean)
                }
                onChange={(ids) =>
                  handleChange(
                    "managers",
                    ids
                      .map((id) => users.find((u) => u._id === id))
                      .filter(Boolean),
                  )
                }
              >
                {users.map((user) => (
                  <Option key={`user-${user._id}`} value={user._id}>
                    {user.fullName || user.username || user.name}
                  </Option>
                ))}
              </Select>
            )}
          </Col>

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