import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Space,
  Card,
  Select,
  Tag,
  DatePicker,
  Popconfirm,
  Avatar,
  Typography,
  message,
  Spin,
  Empty,
  Result,
  Divider,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import Comment from "../../components/ui/task/Comment";
import {
  fetchTaskById,
  updateTask,
  deleteTask,
  clearUpdateStatus,
} from "../../store/slices/taskSlice";
import { useProject } from "../../context/ProjectContext";

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

// Constants for status and priority options
const taskStatuses = {
  TODO: { label: "To Do", color: "default" },
  IN_PROGRESS: { label: "In Progress", color: "processing" },
  REVIEW: { label: "Review", color: "warning" },
  COMPLETED: { label: "Completed", color: "success" },
};

const taskPriorities = {
  LOW: { label: "Low", color: "default" },
  MEDIUM: { label: "Medium", color: "warning" },
  HIGH: { label: "High", color: "error" },
};

const TaskSpecific = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { projects = [] } = useProject();
  const [projectMembers, setProjectMembers] = useState([]);

  // Get task and loading state from Redux store
  const {
    currentTask,
    loading,
    error: taskError,
  } = useSelector((state) => ({
    currentTask: state.tasks.currentTask,
    loading: state.tasks.loading,
    error: state.tasks.error,
  }));

  // Fetch task data when component mounts or ID changes
  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        navigate("/tasks");
        return;
      }

      try {
        setError(null);
        await dispatch(fetchTaskById(id)).unwrap();
      } catch (err) {
        console.error("Failed to fetch task:", err);
        setError("Failed to load task. Please try again later.");
        message.error("Failed to load task details");
      }
    };

    fetchTask();

    // Cleanup function to clear task data when component unmounts
    return () => {
      dispatch(clearUpdateStatus());
    };
  }, [id, dispatch, navigate]);

  // Set form initial values when currentTask changes
  useEffect(() => {
    if (!currentTask) return;

    try {
      // Format assigned users for the form
      const assignedUsers = Array.isArray(currentTask.assignedUsers)
        ? currentTask.assignedUsers
            .filter((user) => user?._id)
            .map((user) => ({
              value: user._id,
              label: user.username || user.name || user.email || "Unknown User",
            }))
        : [];

      const formValues = {
        taskTitle: currentTask.title || currentTask.taskTitle || "",
        project: currentTask.project?._id || currentTask.projectId || "",
        taskStatus:
          currentTask.status || currentTask.taskStatus || TASK_STATUS.TODO,
        taskPriority:
          currentTask.priority ||
          currentTask.taskPriority ||
          TASK_PRIORITY.MEDIUM,
        taskStartDate:
          currentTask.startDate || currentTask.taskStartDate
            ? dayjs(currentTask.startDate || currentTask.taskStartDate)
            : null,
        taskEndDate:
          currentTask.dueDate || currentTask.taskEndDate
            ? dayjs(currentTask.dueDate || currentTask.taskEndDate)
            : null,
        taskAssign:
          assignedUsers.length > 0
            ? assignedUsers.map((u) => u.value)
            : Array.isArray(currentTask.taskAssign)
            ? currentTask.taskAssign
            : [],
        taskDescription:
          currentTask.description || currentTask.taskDescription || "",
      };

      form.setFieldsValue(formValues);

      // Set project members for select
      const projectId = currentTask.project?._id || currentTask.projectId;
      const project = projects.find((p) => p._id === projectId);
      setProjectMembers(project?.members || []);
    } catch (err) {
      console.error("Error setting form values:", err);
      setError("Failed to load task data");
    }
  }, [currentTask, form, projects]);

  const handleProjectChange = useCallback(
    (projectId) => {
      try {
        const project = projects.find((p) => p._id === projectId);
        const members = project?.members || [];
        setProjectMembers(members);

        // Clear assignees when project changes
        form.setFieldsValue({
          taskAssign: [],
          // Update other fields if needed when project changes
        });

        // Optional: Update any other state that depends on the project
      } catch (err) {
        console.error("Error changing project:", err);
        message.error("Failed to update project members");
      }
    },
    [projects, form],
  );

  const handleSaveUpdate = async (values) => {
    if (!id) {
      message.error("No task ID provided");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Validate required fields

      const taskTitle = form.getFieldsValue().taskTitle?.trim();
      if (!taskTitle) {
        throw new Error("Task title is required");
      }

      // Prepare update data - only include fields that have values
      const updateData = {
        taskTitle: taskTitle,
        taskDescription: form.getFieldsValue().taskDescription?.trim() || "",
        taskPriority:
          form.getFieldsValue().taskPriority || TASK_PRIORITY.MEDIUM,
        taskStatus: form.getFieldsValue().taskStatus || TASK_STATUS.TODO,
        projectId: form.getFieldsValue().project,
      };

      // Only add dates if they exist
      if (form.getFieldsValue().taskStartDate) {
        updateData.taskStartDate = dayjs(
          form.getFieldsValue().taskStartDate,
        ).toISOString();
      }
      if (form.getFieldsValue().taskEndDate) {
        updateData.taskEndDate = dayjs(
          form.getFieldsValue().taskEndDate,
        ).toISOString();
      }

      // Handle task assignments
      if (Array.isArray(form.getFieldsValue().taskAssign)) {
        updateData.taskAssign = form
          .getFieldsValue()
          .taskAssign.filter(Boolean);
      }

      console.log("Prepared update data:", updateData);

      // Update task
      const result = await dispatch(
        updateTask({ id, taskData: updateData }),
      ).unwrap();

      if (result) {
        // Show success message and refresh task data
        message.success("Task updated successfully");
        setEditMode(false);
        await dispatch(fetchTaskById(id)).unwrap();
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      const errorMessage = error.message || "Failed to update task";
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await dispatch(deleteTask(id)).unwrap();
      message.success("Task deleted successfully");
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      const errorMessage = error.message || "Failed to delete task";
      message.error(errorMessage);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="task-loading-container">
        <Spin size="large" tip="Loading task details..." />
      </div>
    );
  }

  // Show error state
  if (error || taskError) {
    return (
      <Result
        status="error"
        title="Error Loading Task"
        subTitle={error || taskError}
        extra={[
          <Button
            type="primary"
            key="back"
            onClick={() => navigate("/tasks")}
            icon={<ArrowLeftOutlined />}
          >
            Back to Tasks
          </Button>,
        ]}
      />
    );
  }

  // Show not found state
  if (!currentTask && !loading) {
    return (
      <Empty description={<span>Task not found</span>}>
        <Button type="primary" onClick={() => navigate("/tasks")}>
          Back to Tasks
        </Button>
      </Empty>
    );
  }
  // Handle form submission
  const onFinish = async (values) => {
    await handleSaveUpdate(values);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow !bg-transparent">
      <Form form={form} className="space-y-6" layout="vertical">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div className="min-w-[250px]">
            {editMode ? (
              <Form.Item
                name="taskTitle"
                className="mb-0"
                rules={[{ required: true, message: "Task title is required" }]}
              >
                <Input
                  placeholder="Task title"
                  className="text-2xl font-semibold"
                />
              </Form.Item>
            ) : (
              <Title
                level={2}
                className="!mb-0 !text-[var(--color-text-secondary)] truncate"
              >
                {currentTask.title}
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
                    htmlType="submit"
                    onClick={onFinish}
                  >
                    Save
                  </Button>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Popconfirm
                    title="Delete this task?"
                    description="Are you sure you want to delete this task?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm>
                </>
              ) : (
                <>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </Button>
                </>
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
                <div>
                  <Text
                    type="secondary"
                    className="block text-xs font-medium mb-1"
                  >
                    Project
                  </Text>
                  {editMode ? (
                    <Form.Item name="project" className="mb-0">
                      <Select
                        showSearch
                        placeholder="Select a project"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.children?.toLowerCase() || "").indexOf(
                            input.toLowerCase(),
                          ) >= 0
                        }
                        className="w-full"
                        onChange={handleProjectChange}
                        loading={loading}
                      >
                        <Option value="">Select a project</Option>
                        {projects?.map((project) => (
                          <Option key={project._id} value={project._id}>
                            {project.name ||
                              project.projectName ||
                              `Project ${project._id}`}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  ) : (
                    <Text className="text-gray-700">
                      {currentTask.project?.name ||
                        currentTask.project?.projectName ||
                        "No project"}
                    </Text>
                  )}
                </div>

                <div>
                  <Text
                    type="secondary"
                    className="block text-xs font-medium mb-1"
                  >
                    Assigned To
                  </Text>
                  {editMode ? (
                    <Form.Item
                      name="taskAssign"
                      label="Assignees"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: "At least one assignee is required",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder={
                          !form.getFieldValue("project")
                            ? "Select a project first"
                            : projectMembers.length === 0
                            ? "No members available in this project"
                            : "Select assignees"
                        }
                        optionLabelProp="label"
                        className="w-full"
                        disabled={
                          !form.getFieldValue("project") ||
                          projectMembers.length === 0
                        }
                        loading={loading}
                      >
                        {projectMembers.map((member) => {
                          const displayName =
                            member.username ||
                            member.name ||
                            member.email ||
                            `User ${member._id}`;
                          return (
                            <Option
                              key={member._id}
                              value={member._id}
                              label={displayName}
                            >
                              <div className="flex items-center gap-2">
                                <Avatar
                                  size="small"
                                  src={member.avatar}
                                  icon={<UserOutlined />}
                                  className="mr-2"
                                />
                                <span className="truncate" title={displayName}>
                                  {displayName}
                                </span>
                              </div>
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(currentTask.assignedUsers) &&
                      currentTask.assignedUsers.length > 0 ? (
                        currentTask.assignedUsers.map((member) => (
                          <Tag key={member._id}>
                            {member.username || member.name}
                          </Tag>
                        ))
                      ) : (
                        <Tag>Unassigned</Tag>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <Text
                    type="secondary"
                    className="block text-xs font-medium mb-1"
                  >
                    Status
                  </Text>
                  {editMode ? (
                    <Form.Item name="taskStatus" className="mb-0">
                      <Select className="w-full">
                        {Object.entries(taskStatuses).map(
                          ([key, { label }]) => (
                            <Select.Option key={key} value={key}>
                              {label}
                            </Select.Option>
                          ),
                        )}
                      </Select>
                    </Form.Item>
                  ) : (
                    <Tag
                      color={
                        taskStatuses[currentTask.status.toUpperCase()]?.color
                      }
                    >
                      {taskStatuses[currentTask.status.toUpperCase()]?.label}
                    </Tag>
                  )}
                </div>

                <div>
                  <Text
                    type="secondary"
                    className="block text-xs font-medium mb-1"
                  >
                    Priority
                  </Text>
                  {editMode ? (
                    <Form.Item name="taskPriority" className="mb-0">
                      <Select className="w-full">
                        {Object.entries(taskPriorities).map(
                          ([key, { label }]) => (
                            <Select.Option key={key} value={key}>
                              {label}
                            </Select.Option>
                          ),
                        )}
                      </Select>
                    </Form.Item>
                  ) : (
                    <Tag
                      color={
                        taskPriorities[currentTask.priority.toUpperCase()]
                          ?.color
                      }
                    >
                      {
                        taskPriorities[currentTask.priority.toUpperCase()]
                          ?.label
                      }
                    </Tag>
                  )}
                </div>

                <div>
                  <Text
                    type="secondary"
                    className="block text-xs font-medium mb-1"
                  >
                    Start Date
                  </Text>
                  {editMode ? (
                    <Form.Item name="taskStartDate" className="mb-0">
                      <DatePicker className="w-full" />
                    </Form.Item>
                  ) : (
                    <Text>
                      {currentTask.startDate
                        ? dayjs(currentTask.startDate).format("MMM D, YYYY")
                        : "Not set"}
                    </Text>
                  )}
                </div>

                <div>
                  <Text
                    type="secondary"
                    className="block text-xs font-medium mb-1"
                  >
                    Due Date
                  </Text>
                  {editMode ? (
                    <Form.Item name="taskEndDate" className="mb-0">
                      <DatePicker className="w-full" />
                    </Form.Item>
                  ) : (
                    <Text>
                      {currentTask.dueDate
                        ? dayjs(currentTask.dueDate).format("MMM D, YYYY")
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
                <Form.Item name="taskDescription" className="mb-0">
                  <TextArea
                    placeholder="Enter task description..."
                    className="w-full min-h-[150px] resize-none"
                    autoSize={{ minRows: 6 }}
                  />
                </Form.Item>
              ) : (
                <div className="prose max-w-none text-gray-700">
                  {currentTask.description || (
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
                    comments={currentTask.comments || []}
                    onAddComment={() => {}}
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
