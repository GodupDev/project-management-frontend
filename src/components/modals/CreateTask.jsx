import React from "react";
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

const { Title } = Typography;
const { Option } = Select;

const priorityOptions = ["High", "Medium", "Low"];
const statusOptions = ["To Do", "In Progress", "Review", "Completed"];

const CreateTask = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { t } = useLanguage();

  const handleSubmit = (values) => {
    const taskData = {
      ...values,
      startDate: values.startDate?.format("YYYY-MM-DD"),
      endDate: values.endDate?.format("YYYY-MM-DD"),
    };
    console.log("Submitted Task:", taskData);
    message.success(t("taskCreatedSuccess"));
    form.resetFields();
    onSuccess?.();
  };

  return (
    <div className="p-4">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="!text-[var(--color-text-primary)] font-semibold">
                {t("modalTaskTitle")}
              </span>
            }
            name="title"
            rules={[{ required: true, message: t("modalInputTaskTitle") }]}
          >
            <Input
              placeholder={t("modalEnterTaskTitle")}
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[var(--color-text-primary)] font-semibold">
                {t("modalTaskPriority")}
              </span>
            }
            name="priority"
            rules={[{ required: true, message: t("modalSelectTaskPriority") }]}
          >
            <Select
              placeholder={t("modalSelectPriority")}
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            >
              {priorityOptions.map((priority) => (
                <Option key={priority} value={priority}>
                  {t(`taskPriority${priority}`)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[var(--color-text-primary)] font-semibold">
                {t("modalTaskStatus")}
              </span>
            }
            name="status"
            rules={[{ required: true, message: t("modalSelectTaskStatus") }]}
          >
            <Select
              placeholder={t("modalSelectStatus")}
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            >
              {statusOptions.map((status) => (
                <Option key={status} value={status}>
                  {t(`taskStatus${status.replace(/\s+/g, "")}`)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[var(--color-text-primary)] font-semibold">
                {t("modalTaskAssignee")}
              </span>
            }
            name="assignee"
            rules={[{ required: true, message: t("modalSelectTaskAssignee") }]}
          >
            <Select
              placeholder={t("modalSelectAssignee")}
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            >
              <Option value="john">John Doe</Option>
              <Option value="jane">Jane Smith</Option>
              <Option value="bob">Bob Johnson</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[var(--color-text-primary)] font-semibold">
                {t("modalStartDate")}
              </span>
            }
            name="startDate"
            rules={[{ required: true, message: t("modalSelectStartDate") }]}
          >
            <DatePicker
              className="w-full !bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
              placeholder={t("modalDateDescription")}
              s
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[var(--color-text-primary)] font-semibold">
                {t("modalEndDate")}
              </span>
            }
            name="endDate"
            rules={[{ required: true, message: t("modalSelectEndDate") }]}
          >
            <DatePicker
              className="w-full !bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
              placeholder={t("modalDateDescription")}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={
            <span className="text-[var(--color-text-primary)] font-semibold">
              {t("modalTaskDescription")}
            </span>
          }
          name="description"
        >
          <Input.TextArea
            rows={4}
            placeholder={t("modalEnterTaskDescription")}
            className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
            placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
            !text-[var(--color-text-primary)] transition-all duration-300 resize-vertical
            hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
            focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
          />
        </Form.Item>

        <Form.Item className="flex justify-center mt-8">
          <Space>
            <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="!bg-[var(--color-primary)] !text-[var(--color-primary-contrast)] 
                hover:!bg-[var(--color-primary-hover)] transition-all duration-300
                focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
              >
                {t("modalCreate")}
              </Button>
            </Motion.div>
            <Button
              htmlType="button"
              danger
              onClick={() => form.resetFields()}
              className="hover:!bg-[var(--color-action-hover)] transition-all duration-300"
            >
              {t("modalClear")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTask;
