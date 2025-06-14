import React from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import { useUserProfile } from "../../context/UserProfileContext";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const { t } = useLanguage();
  const { profile, updateProfile } = useUserProfile();

  const handleSubmit = async (values) => {
    try {
      await updateProfile({
        ...values,
        socialLinks: {
          linkedin: values.linkedin,
          github: values.github,
          facebook: values.facebook,
        },
      });
      onClose();
    } catch {
      console.log("");
    }
  };

  return (
    <Modal
      title={t("profileEdit")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          fullName: profile?.fullName,
          contactNumber: profile?.contactNumber,
          location: profile?.location,
          position: profile?.bestPosition,
          about: profile?.about,
          linkedin: profile?.socialLinks?.linkedin,
          github: profile?.socialLinks?.github,
          facebook: profile?.socialLinks?.facebook,
        }}
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="fullName"
            label={t("profileFullName")}
            rules={[{ required: true, message: t("pleaseInputName") }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="contactNumber" label={t("profilePhone")}>
            <Input />
          </Form.Item>

          <Form.Item name="location" label={t("profileLocation")}>
            <Input />
          </Form.Item>

          <Form.Item name="position" label={t("profileRole")}>
            <Input />
          </Form.Item>

          <Form.Item name="linkedin" label="LinkedIn">
            <Input />
          </Form.Item>

          <Form.Item name="github" label="GitHub">
            <Input />
          </Form.Item>

          <Form.Item name="facebook" label="Facebook">
            <Input />
          </Form.Item>
        </div>

        <Form.Item name="about" label={t("profileAbout")}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="avatar" label={t("profileAvatar")}>
          <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>{t("uploadAvatar")}</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>{t("commonCancel")}</Button>
          <Button type="primary" htmlType="submit">
            {t("profileUpdate")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
