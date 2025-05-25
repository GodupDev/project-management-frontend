import React, { useState } from "react";
import { Card, Avatar, Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useMockData } from "../../context/MockDataContext";

const MyProfile = () => {
  const { settings, updateSettings } = useMockData();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(settings.userProfile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      await updateSettings({
        userProfile: {
          ...settings.userProfile,
          ...values,
        },
      });
      message.success("Profile updated successfully");
      setIsEditing(false);
    } catch {
      message.error("Failed to update profile");
    }
  };

  return (
    <Card title="My Profile" className="mb-4">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <Avatar
            size={100}
            src={settings.userProfile.avatar}
            icon={<UserOutlined />}
          />
        </div>
        <div className="flex-grow">
          {isEditing ? (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={settings.userProfile}
            >
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  { required: true, message: "Please input your location!" },
                ]}
              >
                <Input prefix={<EnvironmentOutlined />} />
              </Form.Item>
              <Form.Item>
                <div className="flex gap-2">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </div>
              </Form.Item>
            </Form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {settings.userProfile.fullName}
                </h3>
                <p className="text-gray-600">{settings.userProfile.role}</p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <MailOutlined /> {settings.userProfile.email}
                </p>
                <p className="flex items-center gap-2">
                  <PhoneOutlined /> {settings.userProfile.phone}
                </p>
                <p className="flex items-center gap-2">
                  <EnvironmentOutlined /> {settings.userProfile.location}
                </p>
              </div>
              <Button type="primary" onClick={handleEdit}>
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MyProfile;
