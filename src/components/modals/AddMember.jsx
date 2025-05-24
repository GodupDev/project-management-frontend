import React from "react";
import { Form, Input, Select, Button, Space, message } from "antd";
import { motion as Motion } from "framer-motion";

const { Option } = Select;

const roleOptions = ["Team Lead", "Developer", "Tester", "Designer", "QA"];

const AddMember = ({ onSuccess, existingMembers = [] }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const name = values.name.trim();
    const role = values.role;

    if (!name) {
      message.error("Member name cannot be empty");
      return;
    }
    if (
      existingMembers.some((m) => m.name.toLowerCase() === name.toLowerCase())
    ) {
      message.warning("This member already exists");
      return;
    }

    onSuccess?.({ name, role });
    form.resetFields();
  };

  return (
    <div className="p-4">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label={
            <span className="!text-[var(--color-text-primary)] font-semibold">
              Member Name
            </span>
          }
          name="name"
          rules={[{ required: true, message: "Please input member name" }]}
        >
          <Input
            placeholder="Enter member name"
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
              Role
            </span>
          }
          name="role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select
            placeholder="Select role"
            className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
            placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
            !text-[var(--color-text-primary)] transition-all duration-300
            hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
            focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
          >
            {roleOptions.map((role) => (
              <Option key={role} value={role}>
                {role}
              </Option>
            ))}
          </Select>
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
                Add
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

export default AddMember;
