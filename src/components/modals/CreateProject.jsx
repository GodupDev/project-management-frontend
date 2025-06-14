import React from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import dayjs from "dayjs";
import { useProject } from "../../context/ProjectContext";

const { RangePicker } = DatePicker;

const CreateProjectForm = ({ setIsCreateModalOpen }) => {
  const [form] = Form.useForm();
  const { createProject } = useProject();
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
        message.success("Project created successfully");
        form.resetFields();
      }

      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Create project error:", error);
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
        label={<span className="font-semibold">Project Name</span>}
        name="projectName"
        rules={[{ required: true, message: "Please enter a project name" }]}
      >
        <Input placeholder="Enter your project name" />
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold">Description</span>}
        name="description"
      >
        <Input.TextArea placeholder="Enter project description" rows={4} />
      </Form.Item>

      <Form.Item
        label={<span className="font-semibold">Project Duration</span>}
        name="dateRange"
      >
        <RangePicker
          format="DD/MM/YYYY"
          className="w-full"
          placeholder={["Start date", "End date"]}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={submitting}
        >
          Create Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProjectForm;
