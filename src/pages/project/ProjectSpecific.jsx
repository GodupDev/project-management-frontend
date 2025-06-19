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
<<<<<<< HEAD
  Tooltip,
=======
  Spin,
  Form,
  Popconfirm,
>>>>>>> origin/main
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
<<<<<<< HEAD
import { useParams, useNavigate, useLocation } from "react-router-dom";
=======
import { useParams, useNavigate } from "react-router-dom";
>>>>>>> origin/main
import { useLanguage } from "../../context/LanguageContext";
import { useProject } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";
import { useUserProfile } from "../../context/UserProfileContext";

import TaskBoard from "../../components/ui/task/TaskBoard";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

<<<<<<< HEAD
export default function ProjectSpecific() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state?.projectData;
  const { t } = useLanguage();

  // Hardcoded data
  const users = [
    { id: 1, fullName: "Alice Johnson", avatar: "" },
    { id: 2, fullName: "Bob Smith", avatar: "" },
    { id: 3, fullName: "Charlie Brown", avatar: "" },
  ];

  const projects = [
    {
      id: 1,
      name: "abc",
      description: "Redesign the marketing website.",
      status: t("inProgress"),
      startDate: "2024-06-01T00:00:00Z",
      expectedEndDate: "2024-07-01T00:00:00Z",
      managers: [users[0], users[1]],
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
=======
// Define MEMBER_ROLES outside the component to prevent re-creation on re-renders
const MEMBER_ROLES = [
  { value: "leader", label: "Leader", color: "red" },
  { value: "staff", label: "Staff", color: "blue" },
];

export default function ProjectSpecific() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { t } = useLanguage();
  const { getProjectById, updateProject, deleteProject } = useProject();
  const { getUserByEmail } = useAuth();

  const [projectData, setProjectData] = useState(null);
>>>>>>> origin/main
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [loading, setLoading] = useState(projectData === null);
  const [saving, setSaving] = useState(false);
  const [editedMembers, setEditedMembers] = useState();
  const [form] = Form.useForm();
  const { setProfileId } = useUserProfile();

  const projectStatuses = [
    { value: "active", label: t("active"), color: "green" },
    { value: "completed", label: t("completed"), color: "blue" },
    { value: "on_hold", label: t("onHold"), color: "orange" },
    { value: "cancelled", label: t("cancelled"), color: "red" },
  ];

  const fetchProject = useCallback(async () => {
    if (!projectId) {
      navigate("/projects");
      return;
    }
<<<<<<< HEAD
  }, [projectData, projectName]);

  useEffect(() => {
    const filteredTasks = tasks.filter((t) => t.project.id === project?.id);
    setProjectTasks(filteredTasks);
  }, [project]);
=======

    try {
      setLoading(true);
      const fetchedProject = await getProjectById(projectId);
      if (!fetchedProject) {
        navigate("/projects");
        return;
      }
      setProjectData(fetchedProject);
      setEditedProject(fetchedProject);
      setEditedMembers(fetchedProject.members);
    } catch (error) {
      console.error("Error fetching project:", error);
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  }, [projectId, navigate, getProjectById]);

  useEffect(() => {
    fetchProject();
  }, [projectId]);
>>>>>>> origin/main

  const clearEditedProject = () => {
    const clearedEditedProject = {
      projectName: editedProject.projectName,
      description: editedProject.description,
      dateRange: {
        startDate: editedProject.dateRange.startDate,
        endDate: editedProject.dateRange.endDate,
      },
      status: editedProject.status,
      members: editedMembers.map((member) => ({
        userId: member.userId,
        role: member.role,
      })),
    };
    return clearedEditedProject;
  };

  const handleInputChange = (field, value) => {
    setEditedProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

<<<<<<< HEAD
  const handleSave = () => {
    const updatedProjects = projects.map((p) =>
      p.id === editedProject.id ? editedProject : p,
    );
    setProject(editedProject);
    setEditMode(false);
    message.success(t("projectUpdatedSuccess"));
    // Since this is hardcoded, the update is local only
=======
  const handleDateChange = (field, date) => {
    setEditedProject((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: date ? date.toISOString() : null,
      },
    }));
>>>>>>> origin/main
  };

  const handleAddEmail = async () => {
    const values = await form.validateFields(); // validate tất cả
    const email = values.memberEmail;
    const user = await getUserByEmail(email);
    if (!user) {
      form.setFields([
        {
          name: "memberEmail",
          errors: [t("userNotFound")],
        },
      ]);
      return;
    }
    if (editedMembers.some((m) => m.userId === user._id)) {
      form.setFields([
        {
          name: "memberEmail",
          errors: [t("userAlreadyAdded")],
        },
      ]);
      return;
    }

    setEditedMembers((prev) => [{ ...user, role: "staff" }, ...prev]);
    form.resetFields();
  };

  const handleRoleChange = (userId, newRole) => {
    setEditedMembers((prev) => {
      const updated = prev.map((m) =>
        m.userId === userId ? { ...m, role: newRole } : m,
      );
      // Validate: phải có ít nhất 1 leader
      if (!updated.some((m) => m.role === "leader")) {
        form.setFieldsValue({
          memberError: t("mustHaveLeader"),
        });
      } else {
        form.setFieldsValue({
          memberError: "",
        });
      }
      return updated;
    });
  };

  const handleSave = async () => {
    if (!projectData?._id || !editedProject) return;

    try {
      setSaving(true);
      
      // Get the cleaned project data first
      const projectToUpdate = clearEditedProject();
      
      console.log('Updating project with data:', projectToUpdate);
      
      // Call the update function with proper parameters
      const updatedProject = await updateProject(projectData._id, projectToUpdate);
      
      if (!updatedProject) {
        throw new Error(t("projectUpdateFailed"));
      }

      // Update local state with the response
      setProjectData(updatedProject);
      setEditedProject(updatedProject);
      setEditMode(false);
      
      message.success(t("projectUpdatedSuccessfully"));
    } catch (error) {
      console.error("Error updating project:", error);
      message.error(error.message || t("projectUpdateFailed"));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProject(projectData);
    setEditMode(false);
    setEditedMembers(projectData.members);
  };

  const handleDelete = async () => {
    if (!projectData?._id) return;

    try {
      setDeleting(true);
      await deleteProject(projectData._id);
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeleting(false);
    }
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
<<<<<<< HEAD
    <div className="p-5 mx-auto space-y-8">
=======
    <div className="p-5 mx-auto !space-y-3">
      <Form form={form}>
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
              <div className="flex gap-2">
                <Button onClick={handleCancel}>{t("cancel")}</Button>
                <Button type="primary" onClick={handleSave} loading={saving}>
                  {t("save")}
                </Button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>
                    <DeleteOutlined /> Delete
                  </Button>
                </Popconfirm>
              </div>
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
                className=" !w-[88%] rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={editedProject.projectName}
                onChange={(e) =>
                  handleInputChange("projectName", e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
                <div className=" flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Form.Item
                      name="memberEmail"
                      rules={[
                        {
                          type: "email",
                          message: t("invalidEmail"), // ví dụ: "Please enter a valid email"
                        },
                      ]}
                      className="flex-1"
                    >
                      <Input
                        name="memberEmail"
                        placeholder={t("enterMemberEmail")}
                        onPressEnter={handleAddEmail}
                      />
                    </Form.Item>
                    <Button type="primary" onClick={handleAddEmail}>
                      {t("addMember")}
                    </Button>
                  </div>
                </div>
              )}
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {editedMembers?.map((member) => (
                  <li
                    key={member.userId}
                    className="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-100 !cursor-pointer"
                    style={{ marginBottom: 2 }}
                    onClick={() => {
                      if (!editMode) setProfileId(member.userId);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={member.avatarUrl}
                        icon={!member.avatarUrl && <UserOutlined />}
                        size={24}
                      />
                      <span style={{ fontSize: 14 }}>{member.username}</span>
                    </div>
                    <div>
                      {editMode ? (
                        <Form.Item
                          style={{ marginBottom: 0 }}
                          name={["members", member.userId, "role"]}
                          initialValue={member.role}
                        >
                          <Select
                            value={member.role}
                            style={{ width: 90 }}
                            size="small"
                            onChange={(val) =>
                              handleRoleChange(member.userId, val)
                            }
                          >
                            {MEMBER_ROLES.map((role) => (
                              <Option key={role.value} value={role.value}>
                                {role.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      ) : (
                        <Tag
                          color={
                            MEMBER_ROLES.find(
                              (r) =>
                                r.value ===
                                (member.role || "").toLowerCase().trim(),
                            )?.color
                          }
                          style={{ fontSize: 12, padding: "0 8px" }}
                        >
                          {MEMBER_ROLES.find(
                            (r) =>
                              r.value ===
                              (member.role || "").toLowerCase().trim(),
                          )?.label || t("member")}
                        </Tag>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {form.getFieldValue("memberError") && (
                <div
                  style={{
                    color: "#ff4d4f",
                    fontSize: 13,
                    margin: "4px 0 0 0",
                  }}
                >
                  {form.getFieldValue("memberError")}
                </div>
              )}
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
                    ? moment(projectData.dateRange.startDate).format(
                        "DD/MM/YYYY",
                      )
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
      </Form>

>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
        <TaskBoard
          tasks={projectData.tasks || []}
          onTaskClick={handleTaskClick}
        />
>>>>>>> origin/main
      </Card>
    </div>
  );
}
