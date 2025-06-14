import React, { useEffect, useState } from "react";
import { Modal, Avatar, Typography, Row, Col, Button, Spin } from "antd";
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
  return date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const IconBlock = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <Col span={24}>
      <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
        {icon}
        <div>
          <Text type="secondary" className="text-xs">
            {label}
          </Text>
          <Text className="block text-sm">{value}</Text>
        </div>
      </div>
    </Col>
  );
};

const ProfileModal = () => {
  const { t, language } = useLanguage();
  const { logout, user } = useAuth();
  const { getProfileById, profileId, setProfileId } = useUserProfile();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (profileId) {
        await getProfileById(profileId).then((data) => setProfile(data || {}));
      }
    };
    fetchProfile();
  }, [profileId]);

  const handleLogout = async () => {
    await logout();
    setProfileId(null);
  };

  return (
    <Modal
      title={t("profileTitle")}
      open={profileId !== null}
      onCancel={() => {
        setProfileId(null);
        setProfile(null);
      }}
      footer={null}
      width={500}
      style={{ top: 50 }}
      styles={{
        body: { padding: "10px" },
        header: {
          borderBottom: "1px solid #e5e7eb",
          padding: "12px 15px",
        },
      }}
    >
      {!profile ? (
        <div className="flex justify-center py-10">
          <Spin />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <Avatar
              size={80}
              src={profile.avatarUrl}
              icon={<UserOutlined />}
              className="mb-2 border border-gray-200"
            />
            <Title level={4} className="mt-2 !mb-5 text-lg">
              {profile.userId.username}
            </Title>
          </div>

          <Row gutter={[12, 12]}>
            <IconBlock
              icon={<UserOutlined className="text-gray-500" />}
              label={t("profileFullName")}
              value={profile.fullName || "-"}
            />

            <IconBlock
              icon={<TeamOutlined className="text-gray-500" />}
              label={t("profileBestPosition")}
              value={profile.bestPosition}
            />

            <IconBlock
              icon={<MailOutlined className="text-gray-500" />}
              label={t("profileEmail")}
              value={profile.userId.email}
            />

            <IconBlock
              icon={<PhoneOutlined className="text-gray-500" />}
              label={t("profilePhone")}
              value={profile.contactNumber}
            />

            <IconBlock
              icon={<EnvironmentOutlined className="text-gray-500" />}
              label={t("profileLocation")}
              value={profile.location}
            />

            <IconBlock
              icon={<ClockCircleOutlined className="text-gray-500" />}
              label={t("joinedDate")}
              value={formatDate(profile.userId.createdAt, language)}
            />

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

            {(profile?.socialLinks?.linkedin ||
              profile?.socialLinks?.github ||
              profile?.socialLinks?.facebook) && (
              <Col span={24}>
                <div className="p-4 bg-white rounded-lg flex flex-col items-center">
                  <div className="flex items-center justify-center gap-5 w-full">
                    {profile?.socialLinks?.linkedin && (
                      <a
                        href={`https://${profile.socialLinks.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn Profile"
                        className="!text-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-md"
                      >
                        <LinkedinOutlined className="text-[3em]" />
                      </a>
                    )}
                    {profile?.socialLinks?.github && (
                      <a
                        href={`https://${profile.socialLinks.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Profile"
                        className="!text-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-md"
                      >
                        <GithubOutlined className="text-[3em]" />
                      </a>
                    )}
                    {profile?.socialLinks?.facebook && (
                      <a
                        href={`https://${profile.socialLinks.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Facebook Profile"
                        className="!text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-md"
                      >
                        <FacebookOutlined className="text-[3em]" />
                      </a>
                    )}
                  </div>
                </div>
              </Col>
            )}
          </Row>
          {user._id === profile.userId._id && (
            <div className="flex justify-center mt-5">
              <Button type="primary" danger onClick={handleLogout}>
                {t("logOut")}
              </Button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default ProfileModal;
