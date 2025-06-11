import React from "react";
import { Modal, Avatar, Typography, Row, Col, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  UserOutlined,
  LinkedinOutlined,
  GithubOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useUserProfile } from "../../context/UserProfileContext";

const { Text, Title } = Typography;

const formatDate = (dateString, language) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(
    language === "vi" ? "vi-VN" : "en-US",
    options,
  );
};

const ProfileModal = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const { logout, user } = useAuth();
  const { profile } = useUserProfile();

  if (!user || !profile) return null;

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <Modal
      title={t("profileTitle")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      style={{ top: 50 }} // 👈 Đây là cách chỉnh vị trí modal
      styles={{
        body: { padding: "10px" },
        header: {
          borderBottom: "1px solid #e5e7eb",
          padding: "12px 15px",
        },
      }}
    >
      <div className="flex flex-col items-center">
        <Avatar
          size={80}
          src={profile.avatarUrl}
          className="mb-2 border border-gray-200"
        />
        <Title level={4} className="mt-2 !mb-5 text-lg">
          {user.username}
        </Title>
      </div>

      <Row gutter={[12, 12]}>
        <Col span={24}>
          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
            <UserOutlined className="text-gray-500" />
            <div>
              <Text type="secondary" className="text-xs">
                {t("profileFullName")}
              </Text>
              <Text className="block text-sm">{profile.fullName || "-"}</Text>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
            <MailOutlined className="text-gray-500" />
            <div>
              <Text type="secondary" className="text-xs">
                {t("profileEmail")}
              </Text>
              <Text className="block text-sm">{user.email}</Text>
            </div>
          </div>
        </Col>

        {profile.contactNumber && (
          <Col span={24}>
            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
              <PhoneOutlined className="text-gray-500" />
              <div>
                <Text type="secondary" className="text-xs">
                  {t("profilePhone")}
                </Text>
                <Text className="block text-sm">{profile.contactNumber}</Text>
              </div>
            </div>
          </Col>
        )}

        {profile.location && (
          <Col span={24}>
            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
              <EnvironmentOutlined className="text-gray-500" />
              <div>
                <Text type="secondary" className="text-xs">
                  {t("profileLocation")}
                </Text>
                <Text className="block text-sm">{profile.location}</Text>
              </div>
            </div>
          </Col>
        )}

        {profile.bestPosition && (
          <Col span={24}>
            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
              <TeamOutlined className="text-gray-500" />
              <div>
                <Text type="secondary" className="text-xs">
                  {t("profileRole")}
                </Text>
                <Text className="block text-sm">{profile.position}</Text>
              </div>
            </div>
          </Col>
        )}

        {user.createdAt && (
          <Col span={24}>
            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
              <ClockCircleOutlined className="text-gray-500" />
              <div>
                <Text type="secondary" className="text-xs">
                  {t("joinedDate")}
                </Text>
                <Text className="block text-sm">
                  {formatDate(user.createdAt, language)}
                </Text>
              </div>
            </div>
          </Col>
        )}

        {profile.about && (
          <Col span={24}>
            <div className="p-2 bg-gray-100 rounded">
              <Text type="secondary" className="text-xs">
                {t("profileAbout")}
              </Text>
              <Text className="block text-sm mt-1">{profile.about}</Text>
            </div>
          </Col>
        )}

        {(profile.socialLinks.linkedin ||
          profile.socialLinks.github ||
          profile.socialLinks.facebook) && (
          <Col span={24}>
            <div className="p-4 bg-white rounded-lg flex flex-col items-center">
              {/* Loại bỏ Text component vì không có trong code bạn cung cấp, hoặc thêm lại nếu bạn muốn có tiêu đề */}
              {/* <Text type="secondary" className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide text-center">
                {t("socialLinks")}
              </Text> */}
              <div className="flex items-center justify-center gap-5 w-full">
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-md" // Màu đen gốc, hiệu ứng hover
                    title="LinkedIn Profile"
                  >
                    <LinkedinOutlined className="text-[3em]" />
                  </a>
                )}
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-gray-700 hover:text-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-md" // Màu đen gốc, hiệu ứng hover
                    title="GitHub Profile"
                  >
                    <GithubOutlined className="text-[3em]" />
                  </a>
                )}
                {profile.socialLinks.facebook && (
                  <a
                    href={profile.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-md" // Màu đen gốc, hiệu ứng hover
                    title="Facebook Profile"
                  >
                    <FacebookOutlined className="text-[3em]" />
                  </a>
                )}
              </div>
            </div>
          </Col>
        )}
      </Row>
      <div className="flex justify-center mt-5">
        <Button type="primary" danger onClick={handleLogout}>
          {t("logOut")}
        </Button>
      </div>
    </Modal>
  );
};

export default ProfileModal;
