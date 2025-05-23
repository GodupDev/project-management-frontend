import React, { useState } from "react";
import {
  Typography,
  Input,
  Select,
  DatePicker,
  Button,
  Form,
  Space,
  Divider,
  message,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const roleOptions = ["Team Lead", "Developer", "Tester", "Designer", "QA"];

const CreateProject = () => {
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
  };

  return (
    <div className="p-2 min-h-screen bg-[var(--color-background-default)]">
      <Title level={3} className="!text-[var(--color-text-primary)] mb-4">
        Projects / Create Project
      </Title>

      <div className="p-6 mt-10">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Project Title"
              name="title"
              rules={[
                { required: true, message: "Please input project title" },
              ]}
            >
              <Input placeholder="Enter project title" />
            </Form.Item>

            <Form.Item
              label="Project Type"
              name="type"
              rules={[
                { required: true, message: "Please select project type" },
              ]}
            >
              <Select placeholder="Select project type">
                <Option value="Type I">Type I</Option>
                <Option value="Type II">Type II</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </div>

          <Form.Item label="Project Description" name="description">
            <Input.TextArea
              rows={4}
              placeholder="Enter project description..."
            />
          </Form.Item>

          <Form.Item label="Project Members" name="members">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Input
                placeholder="Member name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                className="w-full md:w-1/3"
              />
              <Select
                placeholder="Select role"
                value={newMember.role}
                onChange={(value) =>
                  setNewMember({ ...newMember, role: value })
                }
                className="w-full md:w-1/3"
              >
                {roleOptions.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddMember}
              >
                Add Member
              </Button>
            </div>
          </Form.Item>

          <div className="space-y-2 mb-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <div className="flex gap-4 items-center w-full">
                  <span className="font-medium w-1/3">{member.name}</span>
                  <Select
                    value={member.role}
                    onChange={(value) => {
                      setMembers(
                        members.map((m) =>
                          m.id === member.id ? { ...m, role: value } : m,
                        ),
                      );
                    }}
                    className="w-1/2"
                  >
                    {roleOptions.map((role) => (
                      <Option key={role} value={role}>
                        {role}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveMember(member.id)}
                />
              </div>
            ))}
          </div>

          <Form.Item className="flex items-center justify-center">
            <Space>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
              <Button
                htmlType="button"
                danger
                onClick={() => form.resetFields()}
              >
                Delete
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateProject;
