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
  ProjectOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Comment from "../../components/ui/task/Comment";
import { tasks, taskStatuses, taskPriorities, users } from "../../mockdata";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function TaskSpecific() {
  const { taskName, projectName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const taskData = location.state?.taskData;

  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (taskData) {
      setTask(taskData);
      setEditedTask({ ...taskData });
      setComments(taskData.comments || []);
    } else {
      const foundTask = tasks.find(
        (t) => t.name === taskName && t.project?.name === projectName,
      );
      if (foundTask) {
        setTask(foundTask);
        setEditedTask({ ...foundTask });
        setComments(foundTask.comments || []);
      }
    }
  }, [taskData, taskName, projectName]);

  const handleChange = (field, value) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setTask(editedTask);
    setEditMode(false);
    message.success("Task updated successfully");
  };

  const handleAddComment = (content) => {
    const newComment = {
      id: comments.length + 1,
      sender: "Bạn",
      content,
      timeAgo: "Vừa xong",
      avatar: null,
    };
    setComments((prev) => [...prev, newComment]);
  };

  if (!task) {
    return (
      <Card style={{ maxWidth: 700, margin: "auto", marginTop: 50 }}>
        <Text type="danger">Task không tồn tại hoặc không tìm thấy.</Text>
        <Button
          type="link"
          onClick={() => navigate(`/projects/${projectName}`)}
        >
          Quay lại dự án
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
              onClick={() => navigate(`/projects/${projectName}`)}
            />
            {editMode ? "Chỉnh sửa task" : "Chi tiết task"}
          </Space>
        }
        extra={
          editMode ? (
            <>
              <Button
                onClick={() => {
                  setEditMode(false);
                  setEditedTask({ ...task });
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
        {/* Tên task */}
        <Title level={4}>Tên task</Title>
        {!editMode ? (
          <Text strong style={{ fontSize: 16 }}>
            {task.name}
          </Text>
        ) : (
          <Input
            value={editedTask.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Tên task"
            autoFocus
          />
        )}
        <Divider />

        {/* Mô tả */}
        <Title level={4}>Mô tả</Title>
        {!editMode ? (
          <Paragraph style={{ whiteSpace: "pre-wrap" }}>
            {task.description || "Chưa có mô tả."}
          </Paragraph>
        ) : (
          <TextArea
            rows={5}
            value={editedTask.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Mô tả chi tiết task"
          />
        )}
        <Divider />

        <Row gutter={[24, 24]}>
          {/* Người thực hiện */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <UserOutlined /> Người thực hiện
            </Title>
            {!editMode ? (
              <Avatar.Group max={{ count: 3 }}>
                {task.assignees?.map((assignee) => (
                  <Tooltip
                    key={`assignee-${assignee?.id || "unknown"}`}
                    title={assignee?.fullName || "Unknown User"}
                  >
                    <Avatar
                      src={assignee?.avatar}
                      icon={!assignee?.avatar && <UserOutlined />}
                    >
                      {!assignee?.avatar && (assignee?.fullName?.[0] || "?")}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            ) : (
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Chọn người thực hiện"
                value={
                  editedTask.assignees?.map((a) => a?.id).filter(Boolean) || []
                }
                onChange={(ids) =>
                  handleChange(
                    "assignees",
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

          {/* Dự án */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <ProjectOutlined /> Dự án
            </Title>
            <Text>{task.project?.name}</Text>
          </Col>

          {/* Trạng thái */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <TagOutlined /> Trạng thái
            </Title>
            {!editMode ? (
              <Tag
                color={
                  task.status === "Completed"
                    ? "green"
                    : task.status === "In Progress"
                    ? "blue"
                    : task.status === "Review"
                    ? "purple"
                    : task.status === "Cancelled"
                    ? "red"
                    : "orange"
                }
              >
                {task.status}
              </Tag>
            ) : (
              <Select
                value={editedTask.status}
                onChange={(val) => handleChange("status", val)}
                style={{ width: "100%" }}
              >
                {taskStatuses.map((status) => (
                  <Option key={`status-${status}`} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            )}
          </Col>

          {/* Ưu tiên */}
          <Col xs={24} sm={12}>
            <Title level={5}>Ưu tiên</Title>
            {!editMode ? (
              <Tag
                color={
                  task.priority === "High"
                    ? "red"
                    : task.priority === "Medium"
                    ? "gold"
                    : "gray"
                }
              >
                {task.priority}
              </Tag>
            ) : (
              <Select
                value={editedTask.priority}
                onChange={(val) => handleChange("priority", val)}
                style={{ width: "100%" }}
              >
                {taskPriorities.map((priority) => (
                  <Option key={`priority-${priority}`} value={priority}>
                    {priority}
                  </Option>
                ))}
              </Select>
            )}
          </Col>

          {/* Deadline */}
          <Col xs={24} sm={12}>
            <Title level={5}>
              <ClockCircleOutlined /> Deadline
            </Title>
            {!editMode ? (
              <Text>
                {task.deadline
                  ? moment(task.deadline).format("DD/MM/YYYY")
                  : "Chưa xác định"}
              </Text>
            ) : (
              <DatePicker
                value={editedTask.deadline ? moment(editedTask.deadline) : null}
                onChange={(date) =>
                  handleChange("deadline", date ? date.toISOString() : null)
                }
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            )}
          </Col>
        </Row>

        <Divider />

        {/* Bình luận */}
        <Comment
          key={`comments-${task.id}`}
          comments={comments}
          onAddComment={handleAddComment}
        />
      </Card>
    </div>
  );
}
