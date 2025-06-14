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
import { useParams, useNavigate } from "react-router-dom";
import Comment from "../../components/ui/task/Comment";
import { useLanguage } from "../../context/LanguageContext";
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

  const handleAddComment = async (values) => {
    try {
      await dispatch(createComment({ taskId: localTask._id, content: values.content, authorId: values.authorId })).unwrap();
      message.success(t("commentAdded"));
      form.resetFields();
      dispatch(getComments(localTask._id));
    } catch (err) {
      message.error(t("commentAddFail") || err.message);
    }
  };

  const handleUpdateComment = async (commentId, content) => {
    try {
      await dispatch(updateComment({ taskId: localTask._id, commentId, content })).unwrap();
      message.success(t("commentUpdated"));
      dispatch(getComments(localTask._id));
    } catch (err) {
      message.error(t("commentUpdateFail") || err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(deleteComment({ taskId: localTask._id, commentId })).unwrap();
      message.success(t("commentDeleted"));
      dispatch(getComments(localTask._id));
    } catch (err) {
      message.error(t("commentDeleteFail") || err.message);
    }
  };

  const handleReplyComment = async (commentId, content, authorId) => {
    try {
      await dispatch(replyComment({ commentId, content, authorId })).unwrap();
      message.success(t("replyAdded"));
      dispatch(getComments(localTask._id));
    } catch (err) {
      message.error(t("replyAddFail") || err.message);
    }
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

  const getPriorityText = (priority) => {
    if (priority === "low") return t("Low");
    if (priority === "medium") return t("Medium");
    if (priority === "high") return t("High");
    return priority;
  };

  const getStatusText = (status) => {
    if (status === "todo") return t("todo");
    if (status === "in_progress") return t("inProgress");
    if (status === "review") return t("review");
    if (status === "done") return t("done");
    return status;
  };
  
  console.log("Project Members:", projectMembers);

  // Lấy danh sách userId của project member
const projectMemberUsers = (projectMembers || []).filter(m => m.userId).map(m => m.userId);

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
                {projectMemberUsers.map((u) => (
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
  {editMode ? (
    <Input.TextArea
      value={localTask.taskDescription}
      onChange={e =>
        setLocalTask(prev => ({
          ...prev,
          taskDescription: e.target.value,
        }))
      }
      rows={4}
      className="resize-vertical"
    />
  ) : (
    <span className="whitespace-pre-line">{localTask.taskDescription}</span>
  )}
</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          title={<span className="font-semibold">{t("comments")}</span>}
          className="rounded-xl shadow border border-gray-200"
        >
          <div className="space-y-4">
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
    </Motion.div>
  );
};

export default TaskSpecific;