import React, { useState } from "react";
import { Input, Button, List, Select, Avatar, Space, message } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { useProject } from "../context/ProjectContext";
import { useLanguage } from "../context/LanguageContext";

const { Option } = Select;

const MemberList = ({ isEditMode = false, projectId }) => {
  const [email, setEmail] = useState("");
  const { t } = useLanguage();
  const {
    getProjectMembers,
    addProjectMembers,
    updateProjectMember,
    currentProject,
  } = useProject();

  const handleAddMember = async () => {
    if (!email) {
      message.error(t("pleaseEnterEmail"));
      return;
    }
    try {
      await addProjectMembers(projectId, [{ email, role: "staff" }]);
      setEmail("");
      message.success(t("memberAddedSuccess"));
    } catch (error) {
      message.error(error.message || t("memberAddFailed"));
    }
  };

  const handleRoleChange = async (memberId, newRole) => {
    try {
      await updateProjectMember(projectId, memberId, { role: newRole });
      message.success(t("memberUpdatedSuccess"));
    } catch (error) {
      message.error(error.message || t("memberUpdateFailed"));
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await removeProjectMember(projectId, memberId);
      message.success(t("memberRemovedSuccess"));
    } catch (error) {
      message.error(error.message || t("memberRemoveFailed"));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {isEditMode && (
        <div className="mb-6 flex gap-2">
          <Input
            placeholder={t("enterMemberEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button type="primary" onClick={handleAddMember}>
            {t("addMember")}
          </Button>
        </div>
      )}

      <List
        className="bg-white rounded-lg shadow"
        itemLayout="horizontal"
        dataSource={currentProject?.members || []}
        renderItem={(member) => (
          <List.Item
            actions={[
              <Select
                defaultValue={member.role}
                style={{ width: 120 }}
                onChange={(value) => handleRoleChange(member._id, value)}
              >
                <Option value="staff">{t("staff")}</Option>
                <Option value="leader">{t("leader")}</Option>
              </Select>,
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteMember(member._id)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} src={member.avatar} />}
              title={member.name}
              description={member.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default MemberList;
