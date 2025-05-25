import React, { useRef, useEffect, useState } from "react";
import { Typography, Button, Input, List, Avatar, message } from "antd";
import {
  UserOutlined,
  LikeOutlined,
  SendOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useLanguage } from "../../../context/LanguageContext";

const { Text } = Typography;
const { TextArea } = Input;

export default function Comment({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = React.useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const commentsEndRef = useRef(null);
  const commentsContainerRef = useRef(null);
  const { t } = useLanguage();

  // Smooth scroll to bottom when new comment is added
  useEffect(() => {
    if (commentsEndRef.current) {
      const container = commentsContainerRef.current;
      const scrollHeight = container.scrollHeight;
      const currentScroll = container.scrollTop;
      const targetScroll = scrollHeight - container.clientHeight;

      // Only scroll if we're not already at the bottom
      if (Math.abs(targetScroll - currentScroll) > 100) {
        container.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
    }
  }, [comments]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment.trim());
    setNewComment("");
  };

  const renderItem = (item) => {
    const senderName =
      typeof item.sender === "string"
        ? item.sender
        : item.sender?.name || t("unknown");
    const initials = senderName.charAt(0).toUpperCase();

    return (
      <List.Item className="px-4 py-5 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-100">
        <List.Item.Meta
          avatar={
            <Avatar
              icon={<UserOutlined />}
              src={item.avatar}
              size={44}
              style={{
                backgroundColor: item.avatar ? "transparent" : "#60A5FA",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              {!item.avatar && initials}
            </Avatar>
          }
          title={
            <div className="flex items-center gap-3 mb-1">
              <Text strong className="text-gray-800 text-[15px]">
                {senderName}
              </Text>
              <Text
                type="secondary"
                className="text-xs bg-gray-50 px-2 py-0.5 rounded-full"
              >
                {moment(item.timestamp).fromNow()}
              </Text>
            </div>
          }
          description={
            <>
              <div className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-wrap">
                {item.content}
              </div>
              <div className="flex items-center gap-6 mt-4">
                <Button
                  type="text"
                  icon={<LikeOutlined />}
                  size="small"
                  className="text-gray-500 hover:text-blue-500 p-0 h-auto flex items-center"
                >
                  <span className="text-sm ml-1.5">{t("like")}</span>
                </Button>
                <Button
                  type="text"
                  size="small"
                  className="text-gray-500 hover:text-blue-500 p-0 h-auto"
                  onClick={() => message.info(t("featureInDevelopment"))}
                >
                  <span className="text-sm">{t("reply")}</span>
                </Button>
              </div>
            </>
          }
        />
      </List.Item>
    );
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="flex items-center justify-between p-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <Typography.Title
            level={5}
            className="m-0 font-medium text-gray-800"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t("comments")}
          </Typography.Title>
          <Text className="text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full">
            {comments.length} {t("comments")}
          </Text>
        </div>
        <Button
          type="text"
          icon={isCollapsed ? <DownOutlined /> : <UpOutlined />}
          className="text-gray-400 hover:text-gray-600"
        />
      </div>

      {!isCollapsed && (
        <>
          <div
            ref={commentsContainerRef}
            className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300 transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              maxHeight: "350px",
            }}
          >
            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                  <UserOutlined className="text-xl text-blue-500" />
                </div>
                <Text className="text-gray-400 text-sm">{t("noComments")}</Text>
              </div>
            ) : (
              <List
                dataSource={comments}
                itemLayout="horizontal"
                split={false}
                renderItem={renderItem}
              />
            )}
            <div ref={commentsEndRef} />
          </div>

          <div className="p-5 border-t border-gray-100 bg-gray-50/50">
            <div className="flex gap-3">
              <TextArea
                rows={2}
                placeholder={t("writeComment")}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
                maxLength={500}
                style={{
                  flexGrow: 1,
                  borderRadius: 12,
                  fontSize: 15,
                  padding: "12px 16px",
                  border: "1.5px solid #e5e7eb",
                  backgroundColor: "white",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
              <Button
                type="primary"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                icon={<SendOutlined />}
                style={{
                  borderRadius: 12,
                  padding: "0 20px",
                  height: "auto",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.2)",
                }}
                className="hover:shadow-lg transition-all duration-200"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
