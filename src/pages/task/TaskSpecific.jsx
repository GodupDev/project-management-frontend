import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Select,
  Tag,
  DatePicker,
  Avatar,
  Typography,
  message,
  Modal,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  updateTask,
  clearUpdateStatus,
  deleteTask,
  getComments,
  createComment,
  updateComment,
  deleteComment,
  replyComment,
} from "../../store/slices/taskSlice";
import { getProjectMembers } from "../../store/slices/projectSlice";
import Comment from "../../components/ui/task/Comment";
import dayjs from "dayjs";
import { UserOutlined, EditOutlined, SaveOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const statusOptions = [
  { value: "todo", label: "To Do", color: "default" },
  { value: "in_progress", label: "In Progress", color: "processing" },
  { value: "review", label: "Review", color: "warning" },
  { value: "done", label: "Completed", color: "success" },
];

const priorityOptions = [
  { value: "low", label: "Low", color: "green" },
  { value: "medium", label: "Medium", color: "orange" },
  { value: "high", label: "High", color: "red" },
];

const TaskSpecific = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { tasks, loading, updateSuccess, updateError } = useSelector((state) => state.tasks);
  const users = useSelector((state) => state.users?.list || []);
  const projectMembers = useSelector((state) => state.project.members || []);
  const [editMode, setEditMode] = useState(false);
  const [localTask, setLocalTask] = useState(null);
  const currentUserId = useSelector((state) => state.auth.user?._id);
  const comments = useSelector((state) => state.tasks.comments || []);

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

  // Lấy project members khi có localTask
  useEffect(() => {
    if (localTask && localTask.projectId) {
      const projectId = localTask.projectId._id || localTask.projectId;
      dispatch(getProjectMembers(projectId));
    }
  }, [dispatch, localTask && localTask.projectId]);

  // Lấy comment khi có localTask
  useEffect(() => {
    if (localTask && localTask._id) {
      dispatch(getComments(localTask._id));
    }
  }, [dispatch, localTask && localTask._id]);

  // Xử lý thông báo khi update
  useEffect(() => {
    if (updateSuccess) {
      message.success("Task updated!");
      setEditMode(false);
      dispatch(clearUpdateStatus());
    }
    if (updateError) {
      message.error(updateError);
      dispatch(clearUpdateStatus());
    }
  }, [updateSuccess, updateError, dispatch]);

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
      taskEndDate: value ? value.format("YYYY-MM-DD") : null,
    }));
  };

  const handleSaveUpdate = () => {
    dispatch(updateTask(localTask));
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Confirm delete",
      content: "Are you sure to delete this task?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await dispatch(deleteTask(localTask._id)).unwrap();
          message.success("Task deleted");
          navigate("/tasks");
        } catch (err) {
          message.error("Delete failed");
        }
      },
    });
  };

  const handleAddComment = async (values) => {
    try {
      await dispatch(createComment({ taskId: localTask._id, content: values.content, authorId: values.authorId })).unwrap();
      message.success("Comment added");
      form.resetFields();
      dispatch(getComments(localTask._id));
    } catch (err) {
      message.error("Add comment failed");
    }
  };

  const handleReplyComment = async (commentId, content, authorId) => {
    try {
      await dispatch(replyComment({ commentId, content, authorId })).unwrap();
      message.success("Reply added");
      dispatch(getComments(localTask._id));
    } catch (err) {
      message.error("Reply failed");
    }
  };

  // Lấy danh sách userId của project member
  const projectMemberUsers = (projectMembers || []).filter(m => m.userId).map(m => m.userId);
  if (localTask) {
    console.log("Project Name:", localTask.projectId?.projectName);
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow !bg-transparent">
      <Form form={form} className="space-y-6" layout="vertical">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div className="min-w-[250px]">
            {editMode ? (
              <Input
                value={localTask.taskTitle}
                onChange={e => setLocalTask(prev => ({ ...prev, taskTitle: e.target.value }))}
                placeholder="Task title"
                className="text-2xl font-semibold"
              />
            ) : (
              <Title level={2} className="!mb-0 !text-[var(--color-text-secondary)] truncate">
                {localTask.taskTitle}
              </Title>
            )}
          </div>
          <div className="shrink-0">
            <Space wrap>
              {editMode ? (
                <>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSaveUpdate}
                  >
                    Save
                  </Button>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              )}
            </Space>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Left Column - Task Details */}
          <div className="lg:w-1/3 flex flex-col">
            <Card
              title="Task Details"
              className="shadow-sm border border-gray-100 flex-1 flex flex-col h-full"
              styles={{
                header: { borderBottom: "1px solid #f0f0f0" },
                body: { flex: 1, display: "flex", flexDirection: "column" },
              }}
            >
              <div className="space-y-4 flex-1">
                {/* Project */}
                <div>
                  <Text type="secondary" className="block text-xs font-medium mb-1">
                    Project
                  </Text>
                  <Text className="text-gray-700">
                    {localTask.projectId?.projectName || ""}
                  </Text>
                </div>
                {/* Assignee */}
                <div>
                  <Text type="secondary" className="block text-xs font-medium mb-1">
                    Assigned To
                  </Text>
                  {editMode ? (
                    <Select
                      mode="multiple"
                      value={localTask.taskAssign}
                      onChange={handleAssigneeChange}
                      style={{ width: "100%" }}
                      className="w-full"
                    >
                      {projectMemberUsers.map((u) => (
                        <Option key={u._id} value={u._id}>
                          <div className="flex items-center gap-2">
                            <Avatar size="small" src={u.avatar} icon={<UserOutlined />} />
                            <span className="truncate" title={u.username}>{u.username}</span>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(localTask.taskAssign || []).map((id) => {
                        const user = projectMemberUsers.find(u => u._id === id);
                        return (
                          <Tag key={id}>{user?.username || "Unknown"}</Tag>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* Status */}
                <div>
                  <Text type="secondary" className="block text-xs font-medium mb-1">
                    Status
                  </Text>
                  {editMode ? (
                    <Select
                      value={localTask.taskStatus}
                      onChange={handleStatusChange}
                      className="w-full"
                    >
                      {statusOptions.map(opt => (
                        <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                      ))}
                    </Select>
                  ) : (
                    <Tag color={statusOptions.find(opt => opt.value === localTask.taskStatus)?.color}>
                      {statusOptions.find(opt => opt.value === localTask.taskStatus)?.label}
                    </Tag>
                  )}
                </div>
                {/* Priority */}
                <div>
                  <Text type="secondary" className="block text-xs font-medium mb-1">
                    Priority
                  </Text>
                  {editMode ? (
                    <Select
                      value={localTask.taskType}
                      onChange={handlePriorityChange}
                      className="w-full"
                    >
                      {priorityOptions.map(opt => (
                        <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                      ))}
                    </Select>
                  ) : (
                    <Tag color={priorityOptions.find(opt => opt.value === localTask.taskType)?.color}>
                      {priorityOptions.find(opt => opt.value === localTask.taskType)?.label}
                    </Tag>
                  )}
                </div>
                {/* Due Date */}
                <div>
                  <Text type="secondary" className="block text-xs font-medium mb-1">
                    Due Date
                  </Text>
                  {editMode ? (
                    <DatePicker
                      value={localTask.taskEndDate ? dayjs(localTask.taskEndDate) : null}
                      onChange={handleDueDateChange}
                      className="w-full"
                    />
                  ) : (
                    <Text>
                      {localTask.taskEndDate
                        ? dayjs(localTask.taskEndDate).format("MMM D, YYYY")
                        : "Not set"}
                    </Text>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Description & Comments */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            <Card
              title="Description"
              className="shadow-sm border border-gray-100"
              styles={{
                header: { borderBottom: "1px solid #f0f0f0" },
                body: { padding: "16px 24px", minHeight: "50px" },
              }}
            >
              {editMode ? (
                <Input.TextArea
                  value={localTask.taskDescription}
                  onChange={e =>
                    setLocalTask(prev => ({
                      ...prev,
                      taskDescription: e.target.value,
                    }))
                  }
                  rows={6}
                  className="w-full min-h-[150px] resize-none"
                />
              ) : (
                <div className="prose max-w-none text-gray-700">
                  {localTask.taskDescription || (
                    <Text type="secondary" className="italic">
                      No description provided.
                    </Text>
                  )}
                </div>
              )}
            </Card>

            <div className="flex-1 flex flex-col min-h-0">
              <Card
                title="Activity"
                className="shadow-sm border border-gray-100 h-full"
                styles={{
                  header: { borderBottom: "1px solid #f0f0f0" },
                  body: {
                    padding: "16px 24px",
                    display: "flex",
                    flexDirection: "column",
                    height: "calc(100% - 55px)",
                  },
                }}
              >
                <div className="flex-1 overflow-y-auto">
                  <Comment
                    comments={comments}
                    users={users}
                    onAddComment={({ content, authorId }) =>
                      handleAddComment({ content, authorId })
                    }
                    onReply={(commentId, content, authorId) =>
                      handleReplyComment(commentId, content, authorId)
                    }
                    currentUserId={currentUserId}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default TaskSpecific;