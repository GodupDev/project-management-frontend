import React from "react";
import { Typography, Input, Select, Button, Form, Space, message } from "antd";
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
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label={
              <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t("modalMemberName")}
              </span>
            }
            name="name"
            rules={[{ required: true, message: t("modalInputMemberName") }]}
          >
            <Input
              placeholder={t("modalEnterMemberName")}
              className="!bg-white !py-3 !px-4 !border !border-gray-200 !rounded-xl 
              placeholder:!text-gray-400 placeholder:opacity-50 
              !text-gray-700 transition-all duration-300
              hover:!border-indigo-400 focus:!border-indigo-500
              focus:!ring-2 focus:!ring-indigo-200 focus:!ring-opacity-50"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t("modalMemberRole")}
              </span>
            }
            name="role"
            rules={[{ required: true, message: t("modalSelectMemberRole") }]}
          >
            <Select
              placeholder={t("modalSelectRole")}
              className="!bg-white !py-3 !px-4 !border !border-gray-200 !rounded-xl 
              placeholder:!text-gray-400 placeholder:opacity-50 
              !text-gray-700 transition-all duration-300
              hover:!border-indigo-400 focus:!border-indigo-500
              focus:!ring-2 focus:!ring-indigo-200 focus:!ring-opacity-50"
              dropdownStyle={{
                borderRadius: "12px",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
              dropdownRender={(menu) => (
                <div className="p-2 bg-white rounded-xl shadow-lg border border-gray-100">
                  {menu}
                </div>
              )}
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
              <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
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
              className="!bg-white !py-3 !px-4 !border !border-gray-200 !rounded-xl 
              placeholder:!text-gray-400 placeholder:opacity-50 
              !text-gray-700 transition-all duration-300
              hover:!border-indigo-400 focus:!border-indigo-500
              focus:!ring-2 focus:!ring-indigo-200 focus:!ring-opacity-50"
            />
          </Form.Item>

          <Form.Item className="flex justify-center mt-8">
            <Space size="large">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="!bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white !py-2 !px-6 !rounded-xl
                  hover:!from-indigo-700 hover:!to-purple-700 transition-all duration-300
                  focus:!ring-2 focus:!ring-indigo-200 focus:!ring-opacity-50"
                >
                  {t("modalAdd")}
                </Button>
              </motion.div>
              <Button
                htmlType="button"
                danger
                onClick={() => form.resetFields()}
                className="!py-2 !px-6 !rounded-xl hover:!bg-red-50 transition-all duration-300"
              >
                {t("modalClear")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  );
};

export default AddMember;
