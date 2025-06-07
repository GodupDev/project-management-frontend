import React from "react";
import { Modal, Avatar, Typography, Row, Col, Tag } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";

const { Text, Title } = Typography;

const ProfileModal = ({ isOpen, onClose, user }) => {
  const { t } = useLanguage();
  if (!user) return null;

  return (
    <Modal
      title={t("profileEdit")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      styles={{
        body: {
          padding: "20px",
        },
        header: {
          borderBottom: "1px solid #e5e7eb",
          padding: "12px 20px",
        },
      }}
    >
      <div className="flex flex-col items-center mb-4">
        <Avatar
          size={80}
          src={user.avatar}
          className="mb-2 border border-gray-200"
        />
        <Title level={4} className="mb-1 text-lg">
          {user.fullName}
        </Title>
        <Tag color="default" className="text-xs">
          {user.role}
        </Tag>
      </div>

      <Row gutter={[12, 12]}>
        <Col span={24}>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <MailOutlined className="text-gray-500" />
            <div>
              <Text type="secondary" className="text-xs">
                {t("profileEmail")}
              </Text>
              <Text className="block text-sm">{user.email}</Text>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <PhoneOutlined className="text-gray-500" />
            <div>
              <Text type="secondary" className="text-xs">
                {t("profilePhone")}
              </Text>
              <Text className="block text-sm">{user.phone}</Text>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <EnvironmentOutlined className="text-gray-500" />
            <div>
              <Text type="secondary" className="text-xs">
                {t("profileLocation")}
              </Text>
              <Text className="block text-sm">{user.location}</Text>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <TeamOutlined className="text-gray-500" />
            <div>
              <Text type="secondary" className="text-xs">
                {t("profileRole")}
              </Text>
              <Text className="block text-sm">{user.department}</Text>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <ClockCircleOutlined className="text-gray-500" />
            <div>
              <Text type="secondary" className="text-xs">
                {t("joinedDate")}
              </Text>
              <Text className="block text-sm">{user.joinedDate}</Text>
            </div>
          </div>
        </Col>

        {user.bio && (
          <Col span={24}>
            <div className="p-2 bg-gray-50 rounded">
              <Text type="secondary" className="text-xs">
                {t("profileAbout")}
              </Text>
              <Text className="block text-sm mt-1">{user.bio}</Text>
            </div>
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export default ProfileModal;
