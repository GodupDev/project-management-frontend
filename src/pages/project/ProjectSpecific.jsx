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
import { projects, tasks, projectStatuses, users } from "../../mockdata";
import TaskBoard from "../../components/ui/task/TaskBoard";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function ProjectSpecific() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state?.projectData;

  const [project, setProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState(null);

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
  }, [projectData, projectName]);

  useEffect(() => {
    // Filter tasks for this project
    const projectTasks = tasks.filter((t) => t.project.id === project?.id);
    setProjectTasks(projectTasks);
  }, [project]);

  const handleChange = (field, value) => {
    setEditedProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setProject(editedProject);
    setEditMode(false);
    message.success("Project updated successfully");
  };

  const handleTaskClick = (task) => {
    navigate(`/projects/${projectName}/${task.name}`, {
      state: { taskData: task },
    });
  };

  if (!project) {
    return (
      <Card style={{ maxWidth: 700, margin: "auto", marginTop: 50 }}>
        <Text type="danger">Project không tồn tại hoặc không tìm thấy.</Text>
        <Button type="link" onClick={() => navigate("/projects")}>
          Quay lại danh sách
        </Button>
      </Card>
    );
  }

  return (
    <div className="!p-5 mx-auto space-y-8">
      <Card
        title={
          <Space>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/projects")}
            />
            {editMode ? "Chỉnh sửa dự án" : "Chi tiết dự án"}
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
                Hủy
              </Button>
              <Button type="primary" onClick={handleSave}>
                Lưu
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)} type="primary" ghost>
              Sửa
            </Button>
          )
        }
      >
        {/* Tên dự án */}
        <div>
          <Title level={4}>Tên dự án</Title>
          {!editMode ? (
            <Text strong style={{ fontSize: 16 }}>
              {project.name}
            </Text>
          ) : (
            <Input
              value={editedProject.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Tên dự án"
              autoFocus
            />
          )}
        </div>

        <Divider />

        {/* Mô tả */}
        <div>
          <Title level={4}>Mô tả</Title>
          {!editMode ? (
            <Paragraph style={{ whiteSpace: "pre-wrap" }}>
              {project.description || "Chưa có mô tả."}
            </Paragraph>
          ) : (
            <TextArea
              rows={5}
              value={editedProject.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Mô tả chi tiết dự án"
            />
          )}
        </div>

        <Divider />

        <Row gutter={[24, 24]}>
          {/* Người quản lý */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <UserOutlined /> Người quản lý
            </Title>
            {!editMode ? (
              <Avatar.Group max={{ count: 3 }}>
                {project.managers?.map((manager) => (
                  <Tooltip
                    key={`manager-${manager?.id || "unknown"}`}
                    title={manager?.fullName || "Unknown User"}
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
                placeholder="Chọn người quản lý"
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

          {/* Trạng thái */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <TagOutlined /> Trạng thái
            </Title>
            {!editMode ? (
              <Tag
                color={
                  project.status === "Completed"
                    ? "green"
                    : project.status === "In Progress"
                    ? "blue"
                    : project.status === "On Hold"
                    ? "orange"
                    : project.status === "Cancelled"
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
                  <Option key={`status-${status}`} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            )}
          </Col>

          {/* Ngày bắt đầu */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <ClockCircleOutlined /> Ngày bắt đầu
            </Title>
            {!editMode ? (
              <Text>
                {project.startDate
                  ? moment(project.startDate).format("DD/MM/YYYY")
                  : "Chưa xác định"}
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

          {/* Ngày kết thúc dự kiến */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <ClockCircleOutlined /> Ngày kết thúc dự kiến
            </Title>
            {!editMode ? (
              <Text>
                {project.expectedEndDate
                  ? moment(project.expectedEndDate).format("DD/MM/YYYY")
                  : "Chưa xác định"}
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

        {/* Danh sách task */}
        <div>
          <Title level={4}>Tasks</Title>
          <TaskBoard tasks={projectTasks} onTaskClick={handleTaskClick} />
        </div>
      </Card>
    </div>
  );
}
