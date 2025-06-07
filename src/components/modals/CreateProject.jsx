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
import { useLanguage } from "../../context/LanguageContext";

const { Title } = Typography;
const { Option } = Select;

const roleOptions = ["Team Lead", "Developer", "Tester", "Designer", "QA"];

const CreateProject = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", role: "" });
  const { t } = useLanguage();

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
    message.success(t("projectCreatedSuccess"));
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
              <span className="font-semibold">{t("modalProjectTitle")}</span>
            }
            name="title"
            rules={[{ required: true, message: t("modalInputProjectTitle") }]}
          >
            <Input placeholder={t("modalEnterProjectTitle")} />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold">{t("modalProjectType")}</span>
            }
            name="type"
            rules={[{ required: true, message: t("modalSelectProjectType") }]}
          >
            <Select placeholder={t("modalSelectProjectType")}>
              <Option value="web">{t("modalWeb")}</Option>
              <Option value="app">{t("modalApp")}</Option>
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
          label={
            <span className="font-semibold">
              {t("modalProjectDescription")}
            </span>
          }
          name="description"
        >
          <Input.TextArea
            rows={4}
            placeholder={t("modalEnterProjectDescription")}
            className="resize-vertical"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-semibold">{t("modalAddProjectMember")}</span>
          }
        >
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Input
              placeholder={t("modalMemberName")}
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              className="w-full max-w-[75%]"
            />
            <Select
              placeholder={t("modalSelectRole")}
              value={newMember.role}
              onChange={(value) => setNewMember({ ...newMember, role: value })}
              className="w-full max-w-[25%]"
            >
              {roleOptions.map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </div>
        </Form.Item>

        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
            >
              <span className="flex-1 font-semibold">{member.name}</span>
              <Select
                value={member.role}
                onChange={(value) => {
                  setMembers(
                    members.map((m) =>
                      m.id === member.id ? { ...m, role: value } : m,
                    ),
                  );
                }}
                className="flex-1"
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
              />
            </div>
          ))}
        </div>

        <Form.Item className="flex justify-center mt-8">
          <Space>
            <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="primary" htmlType="submit">
                {t("modalCreate")}
              </Button>
            </Motion.div>
            <Button
              htmlType="button"
              danger
              onClick={() => {
                form.resetFields();
                setMembers([]);
              }}
            >
              {t("modalClear")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProject;
