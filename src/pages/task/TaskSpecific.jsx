import React, { useState } from "react";
import {
  Card,
  Descriptions,
  Tag,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
} from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Comment from "../../components/ui/task/Comment";
import { useLanguage } from "../../context/LanguageContext";
import { motion as Motion } from "framer-motion";
import dayjs from "dayjs";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const TaskSpecific = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Hardcoded data
  const task = {
    id: id,
    title: "Implement User Authentication",
    description: "Set up secure user authentication system with JWT tokens",
    status: "in_progress",
    priority: "high",
    dueDate: "2024-03-15",
    assignee: {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    project: {
      id: 1,
      name: "Website Redesign",
    },
    comments: [
      {
        id: 1,
        user: {
          id: 1,
          name: "John Doe",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        content: "Started working on the authentication system",
        createdAt: "2024-02-20T10:00:00",
      },
      {
        id: 2,
        user: {
          id: 2,
          name: "Jane Smith",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        content: "Don't forget to implement password reset functionality",
        createdAt: "2024-02-20T11:30:00",
      },
    ],
  };

  const handleStatusChange = (value) => {
    // In a real app, this would update the task status in the backend
    console.log("Updating task status:", value);
    message.success(t("taskStatusUpdated"));
  };

  const handlePriorityChange = (value) => {
    // In a real app, this would update the task priority in the backend
    console.log("Updating task priority:", value);
    message.success(t("taskPriorityUpdated"));
  };

  const handleAssigneeChange = (value) => {
    // In a real app, this would update the task assignee in the backend
    console.log("Updating task assignee:", value);
    message.success(t("taskAssigneeUpdated"));
  };

  const handleDueDateChange = (value) => {
    // In a real app, this would update the task due date in the backend
    console.log("Updating task due date:", value);
    message.success(t("taskDueDateUpdated"));
  };

  const handleDelete = () => {
    Modal.confirm({
      title: t("deleteTask"),
      content: t("deleteTaskConfirm"),
      okText: t("delete"),
      okType: "danger",
      cancelText: t("cancel"),
      onOk: () => {
        // In a real app, this would delete the task from the backend
        console.log("Deleting task:", id);
        message.success(t("taskDeleted"));
        navigate("/tasks");
      },
    });
  };

  const handleAddComment = (values) => {
    // In a real app, this would add the comment to the backend
    console.log("Adding comment:", values);
    message.success(t("commentAdded"));
    form.resetFields();
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: "default",
      in_progress: "processing",
      review: "warning",
      done: "success",
    };
    return colors[status] || "default";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "green",
      medium: "orange",
      high: "red",
    };
    return colors[priority] || "default";
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <Card
          title={task.title}
          extra={
            <Space>
              <Button onClick={() => navigate("/tasks")}>{t("back")}</Button>
              <Button type="primary" danger onClick={handleDelete}>
                {t("delete")}
              </Button>
            </Space>
          }
        >
          <Descriptions column={2}>
            <Descriptions.Item label={t("status")}>
              <Select
                value={task.status}
                onChange={handleStatusChange}
                style={{ width: 200 }}
              >
                <Select.Option value="todo">{t("todo")}</Select.Option>
                <Select.Option value="in_progress">
                  {t("inProgress")}
                </Select.Option>
                <Select.Option value="review">{t("review")}</Select.Option>
                <Select.Option value="done">{t("done")}</Select.Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label={t("priority")}>
              <Select
                value={task.priority}
                onChange={handlePriorityChange}
                style={{ width: 200 }}
              >
                <Select.Option value="low">{t("low")}</Select.Option>
                <Select.Option value="medium">{t("medium")}</Select.Option>
                <Select.Option value="high">{t("high")}</Select.Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label={t("assignee")}>
              <Select
                value={task.assignee.id}
                onChange={handleAssigneeChange}
                style={{ width: 200 }}
              >
                <Select.Option value={1}>John Doe</Select.Option>
                <Select.Option value={2}>Jane Smith</Select.Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label={t("dueDate")}>
              <DatePicker
                value={dayjs(task.dueDate)}
                onChange={handleDueDateChange}
                style={{ width: 200 }}
              />
            </Descriptions.Item>
            <Descriptions.Item label={t("project")} span={2}>
              {task.project.name}
            </Descriptions.Item>
            <Descriptions.Item label={t("description")} span={2}>
              {task.description}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title={t("comments")}>
          <div className="space-y-4">
            {task.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <Form form={form} onFinish={handleAddComment}>
              <Form.Item
                name="content"
                rules={[{ required: true, message: t("commentRequired") }]}
              >
                <TextArea rows={4} placeholder={t("addComment")} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t("addComment")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </Motion.div>
  );
};

export default TaskSpecific;
