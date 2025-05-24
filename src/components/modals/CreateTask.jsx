import React from "react";
import { Form, Input, Select, DatePicker, Button, Space, message } from "antd";
import { motion as Motion } from "framer-motion";

const { Option } = Select;
const { TextArea } = Input;

const CreateTask = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const taskData = {
      ...values,
      deadline: values.deadline?.format("YYYY-MM-DD"),
      key: Date.now().toString(),
    };
    console.log("Submitted Task:", taskData);
    message.success("Task created successfully!");
    form.resetFields();
    onSuccess?.(taskData);
  };

  return (
    <div className="p-4">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label={
            <span className="!text-[var(--color-text-primary)] font-semibold">
              Task Name
            </span>
          }
          name="name"
          rules={[{ required: true, message: "Please input task name" }]}
        >
          <Input
            placeholder="Enter task name"
            className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
            placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
            !text-[var(--color-text-primary)] transition-all duration-300
            hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
            focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="!text-[var(--color-text-primary)] font-semibold">
              Project
            </span>
          }
          name="project"
          rules={[{ required: true, message: "Please select project" }]}
        >
          <Select
            placeholder="Select project"
            className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
            placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
            !text-[var(--color-text-primary)] transition-all duration-300
            hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
            focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
          >
            <Option value="Website A">Website A</Option>
            <Option value="App B">App B</Option>
          </Select>
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="!text-[var(--color-text-primary)] font-semibold">
                Assignee
              </span>
            }
            name="assignee"
            rules={[{ required: true, message: "Please select assignee" }]}
          >
            <Select
              placeholder="Select assignee"
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            >
              <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
              <Option value="Trần Thị B">Trần Thị B</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="!text-[var(--color-text-primary)] font-semibold">
                Status
              </span>
            }
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select
              placeholder="Select status"
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            >
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Review">Review</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="!text-[var(--color-text-primary)] font-semibold">
                Priority
              </span>
            }
            name="priority"
            rules={[{ required: true, message: "Please select priority" }]}
          >
            <Select
              placeholder="Select priority"
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            >
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="!text-[var(--color-text-primary)] font-semibold">
                Deadline
              </span>
            }
            name="deadline"
            rules={[{ required: true, message: "Please select deadline" }]}
          >
            <DatePicker
              className="w-full !bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            />
          </Form.Item>
        </div>

        <Form.Item
          label={
            <span className="!text-[var(--color-text-primary)] font-semibold">
              Description
            </span>
          }
          name="description"
        >
          <TextArea
            rows={4}
            placeholder="Enter task description..."
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
                Create
              </Button>
            </Motion.div>
            <Button
              htmlType="button"
              onClick={() => form.resetFields()}
              className="hover:!bg-[var(--color-action-hover)] transition-all duration-300"
            >
              Clear
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTask;
