import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Typography,
  Tag,
  Button,
  Select,
  DatePicker,
  Input,
  Space,
  Divider,
  Row,
  Col,
  Avatar,
  Spin,
} from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ClockCircleOutlined,
  TagOutlined,
  TeamOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useProject } from "../../context/ProjectContext";
import TaskBoard from "../../components/ui/task/TaskBoard";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Define MEMBER_ROLES outside the component to prevent re-creation on re-renders
const MEMBER_ROLES = [
  { value: "leader", label: "Leader", color: "red" },
  { value: "member", label: "Member", color: "blue" },
  { value: "viewer", label: "Viewer", color: "default" },
];

export default function ProjectSpecific() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLanguage();
  const { getProjectById, updateProject } = useProject();

  const [projectData, setProjectData] = useState(
    location.state?.projectData || null,
  );
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState(
    location.state?.projectData || null,
  );
  const [loading, setLoading] = useState(!location.state?.projectData);
  const [saving, setSaving] = useState(false);

  const projectStatuses = [
    { value: "active", label: t("active"), color: "green" },
    { value: "completed", label: t("completed"), color: "blue" },
    { value: "onHold", label: t("onHold"), color: "orange" },
    { value: "cancelled", label: t("cancelled"), color: "red" },
  ];

  const fetchProject = useCallback(async () => {
    const projectIdToFetch = location.state?.projectData?._id || projectId;

    if (!projectIdToFetch) {
      navigate("/projects");
      return;
    }

    try {
      setLoading(true);
      const fetchedProject = await getProjectById(projectIdToFetch);
      if (!fetchedProject) {
        navigate("/projects");
        return;
      }
      setProjectData(fetchedProject);
      setEditedProject(fetchedProject);
    } catch (error) {
      console.error("Error fetching project:", error);
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  }, [projectId, location.state?.projectData, navigate, getProjectById]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleInputChange = (field, value) => {
    setEditedProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    setEditedProject((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: date ? date.toISOString() : null,
      },
    }));
  };

  const handleSave = async () => {
    if (!projectData?._id || !editedProject) return;

    try {
      setSaving(true);
      const updatedData = {
        projectName: editedProject.projectName,
        description: editedProject.description,
        dateRange: {
          startDate: editedProject.dateRange?.startDate,
          endDate: editedProject.dateRange?.endDate,
        },
        status: editedProject.status,
      };

      const updatedProject = await updateProject(projectData._id, updatedData);
      if (!updatedProject) {
        throw new Error(t("projectUpdateFailed"));
      }

      setProjectData(updatedProject);
      setEditedProject(updatedProject);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProject(projectData);
    setEditMode(false);
  };

  const handleTaskClick = useCallback((task) => {
    console.log("Task clicked:", task);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!projectData || !editedProject) {
    return (
      <Card style={{ maxWidth: 1200, margin: "auto", marginTop: 50 }}>
        <Text type="danger">{t("projectNotFound")}</Text>
        <Button type="link" onClick={() => navigate("/projects")}>
          {t("backToList")}
        </Button>
      </Card>
    );
  }

  return (
    <div className="p-5 mx-auto !space-y-3">
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
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                {t("cancel")}
              </Button>
              <Button type="primary" onClick={handleSave} loading={saving}>
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
        <div className="flex !items-center gap-2">
          <Text strong className="!text-lg">
            {t("projectName")}:
          </Text>

          {!editMode ? (
            <Text strong className="!text-lg italic">
              {projectData.projectName || (
                <span className="text-gray-400 italic">({t("noName")})</span>
              )}
            </Text>
          ) : (
            <Input
              className="w-full max-w-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={editedProject.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
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
              {projectData.description || t("noDescription")}
            </Paragraph>
          ) : (
            <TextArea
              rows={5}
              value={editedProject.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder={t("projectDescriptionPlaceholder")}
            />
          )}
        </div>

        <Divider />

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <Title level={5}>
              <TeamOutlined /> {t("members")}
            </Title>
            {editMode && (
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex gap-2">
                  <Input
                    placeholder={t("enterMemberEmail")}
                    className="flex-1"
                  />
                  <Button type="primary" disabled>
                    {t("addMember")}
                  </Button>
                </div>
              </div>
            )}
            <Space direction="vertical" size="middle" className="w-full">
              {projectData.members?.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center justify-between p-2 shadow-sm bg-gray-50 hover:bg-gray-100"
                >
                  <Space>
                    <Avatar
                      src={member.avatarUrl}
                      icon={!member.avatarUrl && <UserOutlined />}
                      size="small"
                    />
                    <span>{member.username}</span>
                  </Space>
                  <Space>
                    {editMode ? (
                      <Select
                        value={member.role}
                        style={{ width: 120 }}
                        disabled
                      >
                        {MEMBER_ROLES.map((role) => (
                          <Option key={role.value} value={role.value}>
                            {role.label}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <Tag
                        color={
                          MEMBER_ROLES.find((r) => r.value === member.role)
                            ?.color || "default"
                        }
                      >
                        {MEMBER_ROLES.find((r) => r.value === member.role)
                          ?.label || t("member")}
                      </Tag>
                    )}
                    {editMode && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        disabled
                      />
                    )}
                  </Space>
                </div>
              ))}
            </Space>
          </Col>

          <Col xs={24} sm={12}>
            <Title level={5}>
              <TagOutlined /> {t("status")}
            </Title>
            {!editMode ? (
              <Tag
                color={
                  projectStatuses.find((s) => s.value === projectData.status)
                    ?.color || "default"
                }
              >
                {projectStatuses.find((s) => s.value === projectData.status)
                  ?.label || projectData.status}
              </Tag>
            ) : (
              <Select
                value={editedProject.status}
                onChange={(val) => handleInputChange("status", val)}
                style={{ width: "100%" }}
              >
                {projectStatuses.map((status) => (
                  <Option key={status.value} value={status.value}>
                    {status.label}
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
                {projectData.dateRange?.startDate
                  ? moment(projectData.dateRange.startDate).format("DD/MM/YYYY")
                  : t("notSpecified")}
              </Text>
            ) : (
              <DatePicker
                value={
                  editedProject.dateRange?.startDate
                    ? moment(editedProject.dateRange.startDate)
                    : null
                }
                onChange={(date) => handleDateChange("startDate", date)}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            )}
          </Col>

          <Col xs={24} sm={12}>
            <Title level={5}>
              <ClockCircleOutlined /> {t("endDate")}
            </Title>
            {!editMode ? (
              <Text>
                {projectData.dateRange?.endDate
                  ? moment(projectData.dateRange.endDate).format("DD/MM/YYYY")
                  : t("notSpecified")}
              </Text>
            ) : (
              <DatePicker
                value={
                  editedProject.dateRange?.endDate
                    ? moment(editedProject.dateRange.endDate)
                    : null
                }
                onChange={(date) => handleDateChange("endDate", date)}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            )}
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <div className="flex justify-between items-center">
            <Title level={4} className="!mb-0">
              {t("tasks")}
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                console.log("Create new task");
              }}
            >
              {t("newTask")}
            </Button>
          </div>
        }
      >
        <TaskBoard
          tasks={projectData.tasks || []}
          onTaskClick={handleTaskClick}
        />
      </Card>
    </div>
  );
}
