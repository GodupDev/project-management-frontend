import React, { useRef, useEffect, useState } from "react";
import { Avatar, Button, Input } from "antd";
import {
  UserOutlined,
  LikeOutlined,
  SendOutlined,
  DownOutlined,
  UpOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useLanguage } from "../../../context/LanguageContext";
import { useDispatch } from "react-redux";
import { getReplyComment } from "../../../store/slices/taskSlice";

const { TextArea } = Input;

export default function Comment({
  comments = [],
  users = [],
  onAddComment,
  onReply,
  currentUserId,
}) {
  const [newComment, setNewComment] = useState("");
  const [replyingId, setReplyingId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState({});
  const commentsEndRef = useRef(null);
  const commentsContainerRef = useRef(null);
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const [rootComments, setRootComments] = useState([]);
  const [childComments, setChildComments] = useState([]);
  
  useEffect(() => {
  const roots = comments.filter(
    (c) =>
      !c.parentCommentId ||
      c.parentCommentId === "" ||
      c.parentCommentId === "null" ||
      (typeof c.parentCommentId === "object" && Object.keys(c.parentCommentId).length === 0)
  );

  const children = comments.filter(
    (c) =>
      c.parentCommentId &&
      c.parentCommentId !== "" &&
      c.parentCommentId !== "null" &&
      !(typeof c.parentCommentId === "object" && Object.keys(c.parentCommentId).length === 0)
  );

  setRootComments(roots);
  setChildComments(children);
}, [comments]);
  


  useEffect(() => {
    if (commentsEndRef.current && commentsContainerRef.current) {
      const container = commentsContainerRef.current;
      const scrollHeight = container.scrollHeight;
      const currentScroll = container.scrollTop;
      const targetScroll = scrollHeight - container.clientHeight;
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
  onAddComment({
    content: newComment.trim(),
    authorId: currentUserId, // truyền authorId
  });
  setNewComment("");
};

  const handleReply = (commentId) => {
    setReplyingId(commentId);
    setReplyContent("");
  };

  const handleSendReply = (commentId) => {
  if (!replyContent.trim()) return;
  if (onReply) {
    onReply(commentId, replyContent.trim(), currentUserId); // truyền authorId
  }
  setReplyingId(null);
  setReplyContent("");
};

  // Lấy username từ authorId
  const getUsername = (authorId) => {
  if (!authorId) return t("unknown");
  // Nếu authorId là object (populate), lấy _id hoặc id
  let id = authorId;
  if (typeof authorId === "object") {
    id = authorId._id || authorId.id || authorId;
  }
  const user = users.find((u) => u._id === id || u.id === id);
  return user ? user.username : t("unknown");
};

  // Xem hoặc ẩn replies cho từng comment cha
  const handleExpandReplies = async (comment) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [comment._id]: !prev[comment._id],
    }));
    // Nếu chưa có replies thì fetch
    if (!comment.replies || comment.replies.length === 0) {
      await dispatch(getReplyComment(comment._id));
    }
  };

  // Đệ quy hiển thị comment và replies
  const renderComment = (item, level = 0) => {
    const senderName = getUsername(item.authorId);
    const initials = senderName.charAt(0).toUpperCase();
    const replyCount = Array.isArray(item.replies) ? item.replies.length : 0;
    return (
      <div key={item._id} className={`mt-2 ${level > 0 ? "pl-10" : ""}`}>
        <div className="flex items-start gap-4 py-4 border-b last:border-b-0 border-gray-100">
          <Avatar
            icon={<UserOutlined />}
            src={item.avatar}
            size={44 - level * 8}
            className="bg-blue-400"
          >
            {!item.avatar && initials}
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-800 text-base">
                {senderName}
              </span>
              <span className="text-xs text-gray-400">
                {moment(item.timestamp || item.createdAt).fromNow()}
              </span>
            </div>
            <div className="text-gray-700 text-[15px] whitespace-pre-wrap">
              {item.content}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Button
                type="text"
                icon={<LikeOutlined />}
                size="small"
                className="text-gray-500 hover:text-blue-500 p-0 h-auto"
              >
                <span className="text-sm ml-1.5">{t("like")}</span>
              </Button>
              <Button
                type="text"
                size="small"
                className="text-gray-500 hover:text-blue-500 p-0 h-auto"
                onClick={() => handleReply(item._id)}
              >
                <span className="text-sm">{t("reply")}</span>
              </Button>
              {/* Nút xem/ẩn replies nếu có hoặc đã từng fetch */}
              <Button
                type="text"
                size="small"
                icon={<MessageOutlined />}
                className="text-gray-500 hover:text-blue-500 p-0 h-auto"
                onClick={() => handleExpandReplies(item)}
              >
                <span className="text-sm">
                  {expandedReplies[item._id]
                    ? `${t("hide Replies") || "Ẩn phản hồi"} (${replyCount})`
                    : `${t("show Replies") || "Xem phản hồi"} (${replyCount})`}
                </span>
              </Button>
            </div>
            {/* Reply input */}
            {replyingId === item._id && (
              <div className="mt-3 flex gap-2">
                <TextArea
                  rows={2}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={t(" Reply")}
                  maxLength={300}
                  className="rounded-md text-sm"
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={() => handleSendReply(item._id)}
                  disabled={!replyContent.trim()}
                  className="rounded-md"
                />
                <Button
                  onClick={() => setReplyingId(null)}
                  className="rounded-md"
                >
                  {t("cancel")}
                </Button>
              </div>
            )}
            {/* Hiển thị replies nếu đã expand */}
            {expandedReplies[item._id] &&
              item.replies &&
              item.replies.length > 0 && (
                <div>
                  {item.replies.map((reply) => renderComment(reply, level + 1))}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="flex items-center justify-between p-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-800 text-lg">
            {t("comments")}
          </span>
          <span className="text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full">
            {comments.length} {t("comments")}
          </span>
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
            {rootComments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                  <UserOutlined className="text-xl text-blue-500" />
                </div>
                <span className="text-gray-400 text-sm">{t("noComments")}</span>
              </div>
            ) : (
              <div>
                {rootComments.map((item) => renderComment(item, 0))}
              </div>
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
                className="rounded-md text-base"
              />
              <Button
                type="primary"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                icon={<SendOutlined />}
                className="rounded-md"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}