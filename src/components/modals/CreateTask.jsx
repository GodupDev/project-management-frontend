import React, { useState, useMemo } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Card,
  Typography,
  Row,
  Col,
  Tag,
} from "antd";
import {
  PlusOutlined,
  FlagOutlined,
  CalendarOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import { useDispatch } from "react-redux";
import { createTask } from "../../store/slices/taskSlice";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Option } = Select;

const CreateTaskBoard = ({
  onSuccess = () => {},
  onCancel = () => {},
  userOptions = [],
  projectOptions = [],
}) => {
  const [form] = Form.useForm();
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const priorityOptions = useMemo(
    () => [
      { value: "high", label: t("High"), color: "red" },
      { value: "medium", label: t("Medium"), color: "orange" },
      { value: "low", label: t("Low"), color: "blue" },
    ],
    [t],
  );

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const [startDate, endDate] = values.dates || [];
      if (!startDate || !endDate) {
        throw new Error(t("Please select a valid date range"));
      }

      const taskData = {
        projectId: values.project,
        taskTitle: values.name,
        taskPriority: values.priority,
        taskStartDate: startDate.toISOString(),
        taskEndDate: endDate.toISOString(),
      };

      await dispatch(createTask(taskData)).unwrap();
      console.log(taskData);
      message.success(t("Task created successfully"));
      form.resetFields();
      onSuccess();
    } catch (err) {
      message.error(err.message || t("Failed to create task"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          priority: "medium",
          dates: [dayjs(), dayjs()],
        }}
      >
        <Card size="small" className="shadow-sm">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="name"
                label={t("Task Name")}
                rules={[
                  { required: true, message: t("Please enter task name") },
                ]}
              >
                <Input placeholder={t("Enter task name")} size="large" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="priority"
                label={t("Priority")}
                rules={[
                  { required: true, message: t("Please select priority") },
                ]}
              >
                <Select size="large">
                  {priorityOptions.map(({ value, label, color }) => (
                    <Option key={value} value={value}>
                      <Tag color={color}>{label}</Tag>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="dates" label={t("Date Range")}>
                <RangePicker
                  className="w-full"
                  size="large"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onCancel} disabled={loading}>
            {t("Cancel")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<PlusOutlined />}
          >
            {t("Create Task")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateTaskBoard;
