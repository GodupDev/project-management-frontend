import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, updateTask, clearUpdateStatus, deleteTask } from "../../store/slices/taskSlice";
import dayjs from "dayjs";

const { TextArea } = Input;

const TaskSpecific = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { tasks, loading, updateSuccess, updateError } = useSelector((state) => state.tasks);
  const users = useSelector((state) => state.users?.list || []);
  const [editMode, setEditMode] = useState(false);
  const [localTask, setLocalTask] = useState(null);
  

  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks.length]);

  // Lấy task theo id
  useEffect(() => {
    const found = tasks.find((t) => t._id === id || t.id === id);
    if (found) setLocalTask({ ...found });
  }, [tasks, id]);

  // Xử lý thông báo khi update
  useEffect(() => {
    if (updateSuccess) {
      message.success(t("taskUpdated") || "Task updated!");
      setEditMode(false);
      dispatch(clearUpdateStatus());
    }
    if (updateError) {
      message.error(updateError);
      dispatch(clearUpdateStatus());
    }
  }, [updateSuccess, updateError, dispatch, t]);

  if (loading || !localTask) return <div>Loading...</div>;
  if (!localTask) return <div>Task not found</div>;

  // Xử lý thay đổi các trường
  const handleStatusChange = (value) => {
    setLocalTask((prev) => ({ ...prev, taskStatus: value }));
  };

  const handlePriorityChange = (value) => {
    setLocalTask((prev) => ({ ...prev, taskType: value }));
  };

  const handleAssigneeChange = (value) => {
    setLocalTask((prev) => ({ ...prev, taskAssign: value }));
  };

  const handleDueDateChange = (value) => {
    setLocalTask((prev) => ({
      ...prev,
      dueDate: value ? value.format("YYYY-MM-DD") : null,
    }));
  };

  const handleSaveUpdate = () => {
    
    const originalTask = tasks.find((t) => t._id === id || t.id === id);
    // Tìm các trường bị thay đổi
    const changedFields = {};
    Object.keys(localTask).forEach((key) => {
      // So sánh sâu cho mảng (assignee), còn lại so sánh thông thường
      if (Array.isArray(localTask[key]) && Array.isArray(originalTask[key])) {
        if (localTask[key].join(",") !== originalTask[key].join(",")) {
          changedFields[key] = { old: originalTask[key], new: localTask[key] };
        }
      } else if (localTask[key] !== originalTask[key]) {
        changedFields[key] = { old: originalTask[key], new: localTask[key] };
      }
    });
    console.log("Các trường bị update:", changedFields);

    dispatch(updateTask(localTask));
  };

  console.log("Local Task:", localTask);
  const handleDelete = () => {
    
    Modal.confirm({
    title: t("Confirm delete"),
    content: t("Are you sure to delete this task"),
    okText: t("Delete"),
    okType: "danger",
    cancelText: t("Cancel"),
    onOk: async () => {
      try {
        await dispatch(deleteTask(localTask._id)).unwrap();
        message.success(t("taskDeleted"));
        navigate("/tasks");
      } catch (err) {
        message.error(t("taskDeleteFail") || err.message);
      }
    },
  });
  };

  const handleAddComment = (values) => {
    // In a real app, this would add the comment to the backend
    message.success(t("commentAdded"));
    form.resetFields();
  };

  // Định nghĩa màu cho status
  const getStatusColor = (status) => {
    const colors = {
      todo: "default",
      in_progress: "processing",
      review: "warning",
      done: "success",
    };
    return colors[status] || "default";
  };

  // Định nghĩa màu cho priority
  const getPriorityColor = (priority) => {
    const colors = {
      low: "green",
      medium: "orange",
      high: "red",
    };
    return colors[priority] || "default";
  };

  // Lấy tên priority (taskType) dạng text
  const getPriorityText = (priority) => {
    if (priority === "low") return t("Low");
    if (priority === "medium") return t("Medium");
    if (priority === "high") return t("High");
    return priority;
  };

  // Lấy tên status dạng text
  const getStatusText = (status) => {
    if (status === "todo") return t("todo");
    if (status === "in_progress") return t("inProgress");
    if (status === "review") return t("review");
    if (status === "done") return t("done");
    return status;
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-8 max-w-3xl mx-auto">
        <Card
          className="rounded-xl shadow-lg border border-gray-200"
          title={<span className="text-xl font-semibold">{localTask.taskTitle}</span>}
          extra={
            <Space>
              <Button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                onClick={() => navigate("/tasks")}
              >
                Back
              </Button>
              {editMode ? (
                <>
                  <Button
                    type="primary"
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={handleSaveUpdate}
                  >
                    Save
                  </Button>
                  <Button
                    className="bg-gray-200 hover:bg-gray-300"
                    onClick={() => {
                      setLocalTask({ ...tasks.find((t) => t._id === id || t.id === id) });
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  type="primary"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => setEditMode(true)}
                >
                  Update
                </Button>
              )}
              <Button
                type="primary"
                danger
                className="bg-red-500 hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Space>
          }
        >
          <Descriptions
            column={2}
            className="!gap-y-6"
            labelStyle={{ fontWeight: 600, fontSize: 16 }}
          >
            <Descriptions.Item
              label={<span className="text-blue-600 font-semibold">Status</span>}
            >
              <div className="flex items-center gap-2">
                <Tag color={getStatusColor(localTask.taskStatus)}>
                  {getStatusText(localTask.taskStatus)}
                </Tag>
                <Select
                  value={localTask.taskStatus}
                  onChange={handleStatusChange}
                  style={{ width: 200 }}
                  className="!rounded-md"
                  disabled={!editMode}
                >
                  <Select.Option value="todo">{t("todo")}</Select.Option>
                  <Select.Option value="in_progress">{t("inProgress")}</Select.Option>
                  <Select.Option value="review">{t("review")}</Select.Option>
                  <Select.Option value="done">{t("done")}</Select.Option>
                </Select>
              </div>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="text-green-600 font-semibold">Priority</span>}
            >
              <div className="flex items-center gap-2">
                <Tag color={getPriorityColor(localTask.taskType)}>
                  {getPriorityText(localTask.taskType)}
                </Tag>
                <Select
                  value={localTask.taskType}
                  onChange={handlePriorityChange}
                  style={{ width: 200 }}
                  className="!rounded-md"
                  disabled={!editMode}
                >
                  <Select.Option value="low">{t("low")}</Select.Option>
                  <Select.Option value="medium">{t("medium")}</Select.Option>
                  <Select.Option value="high">{t("high")}</Select.Option>
                </Select>
              </div>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="text-purple-600 font-semibold">Assignee</span>}
            >
              <Select
                mode="multiple"
                value={localTask.taskAssign}
                onChange={handleAssigneeChange}
                style={{ width: 200 }}
                className="!rounded-md"
                disabled={!editMode}
              >
                {users.map(u => (
                  <Select.Option key={u._id} value={u._id}>
                    {u.username}
                  </Select.Option>
                ))}
              </Select>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="text-pink-600 font-semibold">Due Date</span>}
            >
              <DatePicker
                value={localTask.taskEndDate ? dayjs(localTask.taskEndDate) : null}
                onChange={handleDueDateChange}
                style={{ width: 200 }}
                className="!rounded-md"
                disabled={!editMode}
              />
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="text-orange-600 font-semibold">Project</span>}
              span={2}
            >
              <span className="font-medium">{localTask.projectId?.projectName || ""}</span>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="text-gray-700 font-semibold">Description</span>}
              span={2}
            >
              <span className="whitespace-pre-line">{localTask.taskDescription}</span>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          title={<span className="font-semibold">{t("comments")}</span>}
          className="rounded-xl shadow border border-gray-200"
        >
          <div className="space-y-4">
            {(localTask.comments || []).map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <Form form={form} onFinish={handleAddComment}>
              <Form.Item
                name="content"
                rules={[{ required: true, message: t("commentRequired") }]}
              >
                <TextArea
                  rows={4}
                  placeholder={t("Add comment")}
                  className="!rounded-md"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
                  {t("Add comment")}
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