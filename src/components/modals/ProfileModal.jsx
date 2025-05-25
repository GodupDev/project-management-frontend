import React from "react";
import { Modal, Avatar, Typography, Row, Col, Tag, Divider } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const ProfileModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal
      title="User Profile"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      className="profile-modal"
    >
      <div className="flex flex-col items-center mb-6">
        <Avatar size={100} src={user.avatar} className="mb-4" />
        <Title level={3} className="mb-1">
          {user.fullName}
        </Title>
        <Tag color="blue" className="text-base px-3 py-1">
          {user.role}
        </Tag>
      </div>

      <Divider />

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div className="flex items-center gap-3 mb-2">
            <MailOutlined className="text-gray-500 text-lg" />
            <div>
              <Text type="secondary" className="block text-sm">
                Email
              </Text>
              <Text>{user.email}</Text>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center gap-3 mb-2">
            <PhoneOutlined className="text-gray-500 text-lg" />
            <div>
              <Text type="secondary" className="block text-sm">
                Phone
              </Text>
              <Text>{user.phone}</Text>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center gap-3 mb-2">
            <EnvironmentOutlined className="text-gray-500 text-lg" />
            <div>
              <Text type="secondary" className="block text-sm">
                Location
              </Text>
              <Text>{user.location}</Text>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center gap-3 mb-2">
            <TeamOutlined className="text-gray-500 text-lg" />
            <div>
              <Text type="secondary" className="block text-sm">
                Department
              </Text>
              <Text>{user.department}</Text>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center gap-3 mb-2">
            <ClockCircleOutlined className="text-gray-500 text-lg" />
            <div>
              <Text type="secondary" className="block text-sm">
                Joined Date
              </Text>
              <Text>{user.joinedDate}</Text>
            </div>
          </div>
        </Col>

        {user.bio && (
          <Col span={24}>
            <Text type="secondary" className="block mb-2">
              About
            </Text>
            <Text>{user.bio}</Text>
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export default ProfileModal;
