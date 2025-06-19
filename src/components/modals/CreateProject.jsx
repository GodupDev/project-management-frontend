import React from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import dayjs from "dayjs";
import { useProject } from "../../context/ProjectContext";
import { useLanguage } from "../../context/LanguageContext";
import { useProject } from "../../context/ProjectContext";

const { RangePicker } = DatePicker;

const CreateProjectForm = ({ setIsCreateModalOpen }) => {
  const [form] = Form.useForm();
  const { createProject } = useProject();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = React.useState(false);

  const onFinish = async (values) => {
    if (submitting) return;

    try {
      setSubmitting(true);
      const [startDate, endDate] = values.dateRange || [];

      const payload = {
        projectName: values.projectName,
        description: values.description,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      };

      const result = await createProject(payload);
      if (result) {
        message.success(t("projectCreated"));
        form.resetFields();
      }

      setIsCreateModalOpen(false);
    } catch (error) {
      console.error(t("createProjectError"), error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        dateRange: [dayjs(), null],
      }}
    >
      <Form.Item
        label={<span className="font-semibold">{t("projectName")}</span>}
        name="projectName"
        rules={[{ required: true, message: t("projectNameRequired") }]}
      >
        <Input placeholder={t("enterProjectName")} />
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold">{t("description")}</span>}
        name="description"
      >
        <Input.TextArea
          placeholder={t("projectDescriptionPlaceholder")}
          rows={4}
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold">{t("projectDuration")}</span>}
        name="dateRange"
      >
        <RangePicker
          format="DD/MM/YYYY"
          className="w-full"
          placeholder={[t("startDate"), t("endDate")]}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={submitting}
        >
          {t("createProject")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProjectForm;
