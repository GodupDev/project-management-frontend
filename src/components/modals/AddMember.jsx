import React, { useState } from "react";
import { Typography, Input, Select, Button, Form, Space, message } from "antd";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const { Title } = Typography;
const { Option } = Select;

const roleOptions = ["Team Lead", "Developer", "Tester", "Designer", "QA"];

const AddMember = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { t } = useLanguage();

  const handleSubmit = (values) => {
    console.log("Submitted Member:", values);
    message.success(t("memberAddedSuccess"));
    form.resetFields();
    onSuccess?.();
  };

  return (
    <div className="p-4">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label={
            <span className="!text-[var(--color-text-primary)] font-semibold">
              {t("modalMemberName")}
            </span>
          }
          name="name"
          rules={[{ required: true, message: t("modalInputMemberName") }]}
        >
          <Input
            placeholder={t("modalEnterMemberName")}
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
              {t("modalMemberRole")}
            </span>
          }
          name="role"
          rules={[{ required: true, message: t("modalSelectMemberRole") }]}
        >
          <Select
            placeholder={t("modalSelectRole")}
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

        <Form.Item
          label={
            <span className="text-[var(--color-text-primary)] font-semibold">
              {t("modalMemberEmail")}
            </span>
          }
          name="email"
          rules={[
            { required: true, message: t("modalInputMemberEmail") },
            { type: "email", message: t("modalInvalidEmail") },
          ]}
        >
          <Input
            placeholder={t("modalEnterMemberEmail")}
            className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg 
            placeholder:!text-[var(--color-text-secondary)] placeholder:opacity-50 
            !text-[var(--color-text-primary)] transition-all duration-300
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
                {t("modalAdd")}
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

export default AddMember;
