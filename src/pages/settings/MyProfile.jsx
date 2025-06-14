import React, { useState } from "react";
import { Card, Avatar, Form, Input, Button, Upload } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  FacebookOutlined,
  GithubOutlined,
  InfoCircleOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useUserProfile } from "../../context/UserProfileContext";
import { useLanguage } from "../../context/LanguageContext";
import { motion as Motion } from "framer-motion";

const MyProfile = () => {
  const { profile, loading, updateProfile } = useUserProfile();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      ...profile,
      socialLinks: {
        facebook: profile?.socialLinks?.facebook || "",
        linkedin: profile?.socialLinks?.linkedin || "",
        github: profile?.socialLinks?.github || "",
      },
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    await updateProfile(values);
    setIsEditing(false);
  };

  if (loading) {
    return <div>{t("commonLoading")}</div>;
  }

  const handleAvatarChange = async (info) => {
    const file = info.file.originFileObj;
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error(t("pleaseUploadImage"));
      return;
    }

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    try {
      const base64Image = await toBase64(file);
      await updateProfile({ ...profile, avatarUrl: base64Image });
      message.success(t("avatarUpdatedSuccessfully"));
    } catch (error) {
      message.error(t("uploadFailed"));
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card title={t("profileTitle")} className="mb-4">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            {isEditing ? (
              <Upload
                customRequest={({ file }) =>
                  handleAvatarChange({ file: { originFileObj: file } })
                }
              >
                <div className="relative group cursor-pointer">
                  <Avatar
                    size={120}
                    src={profile?.avatarUrl}
                    icon={<UserOutlined />}
                    className="border-4 border-white shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-xs">
                    {t("changeAvatar")}
                  </div>
                </div>
              </Upload>
            ) : (
              <div className="relative">
                <Avatar
                  size={120}
                  src={profile?.avatarUrl}
                  icon={<UserOutlined />}
                  className="border-4 border-white shadow-xl"
                />
              </div>
            )}
          </div>
          <div className="flex-grow">
            {isEditing ? (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={profile}
              >
                <Form.Item name="fullName" label={t("profileFullName")}>
                  <Input prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item name="bestPosition" label={t("profilePosition")}>
                  <Input prefix={<SolutionOutlined />} />
                </Form.Item>

                <Form.Item
                  name={["userId", "email"]}
                  label={t("profileEmail")}
                  rules={[
                    { type: "email", message: t("pleaseEnterValidEmail") },
                  ]}
                >
                  <Input prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item name="contactNumber" label={t("profilePhone")}>
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>

                <Form.Item name="location" label={t("profileLocation")}>
                  <Input prefix={<EnvironmentOutlined />} />
                </Form.Item>

                <Form.Item
                  name="bio"
                  label={t("profileAbout")}
                  rules={[
                    {
                      max: 300,
                      message: t("aboutMaxLength"),
                    },
                  ]}
                >
                  <Input.TextArea
                    prefix={<InfoCircleOutlined />}
                    rows={4}
                    placeholder={t("aboutPlaceholder")}
                  />
                </Form.Item>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">
                    {t("socialLinks")}
                  </h4>
                  <Form.Item
                    name={["socialLinks", "facebook"]}
                    label="Facebook"
                  >
                    <Input prefix={<FacebookOutlined />} />
                  </Form.Item>

                  <Form.Item
                    name={["socialLinks", "linkedin"]}
                    label="LinkedIn"
                  >
                    <Input prefix={<LinkedinOutlined />} />
                  </Form.Item>

                  <Form.Item name={["socialLinks", "github"]} label="github">
                    <Input prefix={<GithubOutlined />} />
                  </Form.Item>
                </div>

                <Form.Item>
                  <div className="flex gap-2">
                    <Button type="primary" htmlType="submit">
                      {t("commonSave")}
                    </Button>
                    <Button onClick={handleCancel}>{t("commonCancel")}</Button>
                  </div>
                </Form.Item>
              </Form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{profile?.fullName}</h3>
                  {profile?.bestPosition && (
                    <p className="text-gray-600">{profile.bestPosition}</p>
                  )}
                </div>

                <div className="space-y-2">
                  {profile?.userId.email && (
                    <p className="flex items-center gap-2">
                      <MailOutlined /> {profile.userId.email}
                    </p>
                  )}
                  {profile?.contactNumber && (
                    <p className="flex items-center gap-2">
                      <PhoneOutlined /> {profile.contactNumber}
                    </p>
                  )}
                  {profile?.location && (
                    <p className="flex items-center gap-2">
                      <EnvironmentOutlined /> {profile.location}
                    </p>
                  )}
                </div>

                {profile?.bio && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">{t("profileAbout")}</h4>
                    <p className="text-gray-600">{profile.bio}</p>
                  </div>
                )}

                {(profile?.socialLinks?.facebook ||
                  profile?.socialLinks?.linkedin ||
                  profile?.socialLinks?.github) && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">{t("socialLinks")}</h4>
                    <div className="space-y-2">
                      {profile.socialLinks.facebook && (
                        <p className="flex items-center gap-2">
                          <FacebookOutlined /> {profile.socialLinks.facebook}
                        </p>
                      )}
                      {profile.socialLinks.linkedin && (
                        <p className="flex items-center gap-2">
                          <LinkedinOutlined /> {profile.socialLinks.linkedin}
                        </p>
                      )}
                      {profile.socialLinks.github && (
                        <p className="flex items-center gap-2">
                          <GithubOutlined /> {profile.socialLinks.github}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <Button type="primary" onClick={handleEdit}>
                  {t("profileEdit")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Motion.div>
  );
};

export default MyProfile;
