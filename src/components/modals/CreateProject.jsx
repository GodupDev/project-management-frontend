import React, { useState } from "react";
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
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion as Motion } from "framer-motion";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const roleOptions = ["Team Lead", "Developer", "Tester", "Designer", "QA"];

const CreateProject = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", role: "" });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      message.warning("Please enter both name and role.");
      return;
    }
    setMembers([...members, { ...newMember, id: Date.now() }]);
    setNewMember({ name: "", role: "" });
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleSubmit = (values) => {
    const projectData = {
      ...values,
      startDate: values.startDate?.format("YYYY-MM-DD"),
      endDate: values.endDate?.format("YYYY-MM-DD"),
      members,
    };
    console.log("Submitted Project:", projectData);
    message.success("Project created successfully!");
    form.resetFields();
    setMembers([]);
    onSuccess?.();
  };

  return (
    <div className="p-4">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="!text-[var(--color-text-primary)] font-semibold">
                Project Title
              </span>
            }
            name="title"
            rules={[{ required: true, message: "Please input project title" }]}
          >
            <Input
              placeholder="Enter project title"
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
                Project Type
              </span>
            }
            name="type"
            rules={[{ required: true, message: "Please select project type" }]}
          >
            <Select
              placeholder="Select project type"
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            >
              <Option value="web">Web</Option>
              <Option value="app">App</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[var(--color-text-primary)] font-semibold">
                Start Date
              </span>
            }
            name="startDate"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker
              className="w-full !bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[var(--color-text-primary)] font-semibold">
                End Date
              </span>
            }
            name="endDate"
            rules={[{ required: true, message: "Please select end date" }]}
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
            <span className="text-[var(--color-text-primary)] font-semibold">
              Project Description
            </span>
          }
          name="description"
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter project description..."
            className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
            placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
            !text-[var(--color-text-primary)] transition-all duration-300 resize-vertical
            hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
            focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-[var(--color-text-primary)] font-semibold">
              Add Project Member
            </span>
          }
        >
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Input
              placeholder="Member name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300 w-full max-w-[75%]
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            />
            <Select
              placeholder="Select role"
              value={newMember.role}
              onChange={(value) => setNewMember({ ...newMember, role: value })}
              className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
              placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
              !text-[var(--color-text-primary)] transition-all duration-300 w-full max-w-[25%]
              hover:!border-[var(--color-primary)] focus:!border-[var(--color-primary)]
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            >
              {roleOptions.map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddMember}
              className="!border-[var(--color-primary)] !text-[var(--color-primary)] 
              hover:!bg-[var(--color-action-hover)] transition-all duration-300
              focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
            >
              Add
            </Button>
          </div>
        </Form.Item>

        <div className="space-y-3 mb-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-background-elevated)]
              transition-all duration-300 hover:shadow-[var(--shadow-md)]"
            >
              <span className="flex-1 font-semibold text-[var(--color-text-primary)]">
                {member.name}
              </span>
              <Select
                value={member.role}
                onChange={(value) => {
                  setMembers(
                    members.map((m) =>
                      m.id === member.id ? { ...m, role: value } : m,
                    ),
                  );
                }}
                className="flex-1 !bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
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
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveMember(member.id)}
                className="hover:!bg-[var(--color-action-hover)] transition-all duration-300"
              />
            </div>
          ))}
        </div>

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
              danger
              onClick={() => {
                form.resetFields();
                setMembers([]);
              }}
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

export default CreateProject;
