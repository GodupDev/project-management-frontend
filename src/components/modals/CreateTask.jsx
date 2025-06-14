import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  Select,
  DatePicker,
  Button,
  Form,
  Space,
  message,
} from "antd";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../store/slices/taskSlice";
import { fetchAllProjects, getProjectMembers } from "../../store/slices/projectSlice";

const { Option } = Select;

const priorityOptions = ["High", "Medium", "Low"];
const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "completed", label: "Completed" },
];

const CreateTaskBoard = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects) || [];
  const projectMembers = useSelector((state) => state.project.members) || [];
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const handleProjectChange = (projectId) => {
    setSelectedProject(projectId);
    dispatch(getProjectMembers(projectId));
    form.setFieldsValue({ taskAssign: [] }); // reset assignee khi đổi project
  };

  const handleSubmit = async (values) => {
    const taskData = {
      projectId: selectedProject,
      taskTitle: values.title,
      taskType: values.type || "Low", // hoặc lấy từ form nếu có
      taskDescription: values.description || "",
      taskStartDate: values.startDate?.format("YYYY-MM-DD"),
      taskEndDate: values.endDate?.format("YYYY-MM-DD"),
      taskAssign: values.assignee, // array of userId string
      taskStatus: values.status,
    };
    console.log("Creating task with data:", taskData);
    try {
      
      await dispatch(createTask(taskData)).unwrap();
      message.success(t("taskCreatedSuccess"));
      form.resetFields();
      onSuccess?.();
    } catch (err) {
      message.error(t("taskCreatedFail") || err.message);
    }
  };
 console.log("Projects:", selectedProject);
  console.log("Project Members:", projectMembers);
  return (
    <div className="p-4">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={<span className="font-semibold">{t("Project")}</span>}
            name="project"
            rules={[{ required: true, message: t("modalSelectProject") }]}
          >
            <Select
              placeholder={t("Select project")}
              onChange={handleProjectChange}
              showSearch
              optionFilterProp="children"
            >
              {projects.map((project) => (
                <Option key={project._id} value={project._id}>
                  {project.projectName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">{t("modalTaskTitle")}</span>}
            name="title"
            rules={[{ required: true, message: t("modalInputTaskTitle") }]}
          >
            <Input placeholder={t("modalEnterTaskTitle")} />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">{t("modalTaskPriority")}</span>}
            name="priority"
            rules={[{ required: true, message: t("modalSelectTaskPriority") }]}
          >
            <Select placeholder={t("modalSelectPriority")}>
              {priorityOptions.map((priority) => (
                <Option key={priority} value={priority}>
                  {t(`taskPriority${priority}`)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">{t("Task Status")}</span>}
            name="status"
            rules={[{ required: true, message: t("modalSelectTaskStatus") }]}
          >
            <Select placeholder={t("modalSelectStatus")}>
              {statusOptions.map((status) => (
                <Option key={status.value} value={status.value}>
                  {t(status.label)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">{t("modalTaskAssignee")}</span>}
            name="assignee"
            rules={[{ required: true, message: t("modalSelectTaskAssignee") }]}
          >
            <Select
              placeholder={t("modalSelectAssignee")}
              mode="multiple"
              allowClear
              disabled={!selectedProject}
            >
              {(projectMembers || []).map((member) => (
                <Option key={member.userId._id} value={member.userId._id}>
                  {member.userId.username}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">{t("modalStartDate")}</span>}
            name="startDate"
            rules={[{ required: true, message: t("modalSelectStartDate") }]}
          >
            <DatePicker
              className="w-full"
              placeholder={t("modalDateDescription")}
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">{t("modalEndDate")}</span>}
            name="endDate"
            rules={[{ required: true, message: t("modalSelectEndDate") }]}
          >
            <DatePicker
              className="w-full"
              placeholder={t("modalDateDescription")}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="font-semibold">{t("modalTaskDescription")}</span>}
          name="description"
        >
          <Input.TextArea
            rows={4}
            placeholder={t("modalEnterTaskDescription")}
            className="resize-vertical"
          />
        </Form.Item>

        <Form.Item className="flex justify-center mt-8">
          <Space>
            <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="primary" htmlType="submit">
                {t("modalCreate")}
              </Button>
            </Motion.div>
            <Button htmlType="button" danger onClick={() => form.resetFields()}>
              {t("modalClear")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTaskBoard;