import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Tag,
  Button,
  Select,
  DatePicker,
  Input,
  Space,
  message,
  Divider,
  Row,
  Col,
  Avatar,
  Tooltip,
  Upload,
  List,
} from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ClockCircleOutlined,
  TagOutlined,
  ProjectOutlined,
  PaperClipOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Comment from "../../components/ui/task/Comment";
import { useMockData } from "../../context/MockDataContext";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function TaskSpecific() {
  const { taskName, projectName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const taskData = location.state?.taskData;
  const { tasks, updateTasks } = useMockData();

  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [comments, setComments] = useState([]);

  // Mảng file đính kèm, lưu trong editedTask.attachments
  // Cấu trúc: [{ uid, name, url }, ...]
  // url có thể là đường dẫn file hoặc base64, tùy bạn xử lý lưu file thế nào
  // Ở đây mình dùng Upload của Antd mà chưa upload lên server, lưu tạm base64 hoặc file object

  useEffect(() => {
    if (taskData) {
      setTask(taskData);
      setEditedTask({ ...taskData });
      setComments(taskData.comments || []);
    } else {
      const foundTask = tasks.find(
        (t) => t.name === taskName && t.project?.name === projectName,
      );
      if (foundTask) {
        setTask(foundTask);
        setEditedTask({ ...foundTask });
        setComments(foundTask.comments || []);
      }
    }
  }, [taskData, taskName, projectName, tasks]);

  const handleChange = (field, value) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === editedTask.id ? editedTask : t,
    );
    updateTasks(updatedTasks);
    setTask(editedTask);
    setEditMode(false);
    message.success("Task updated successfully");
  };

  const handleAddComment = (content) => {
    const newComment = {
      id: comments.length + 1,
      sender: "Bạn",
      content,
      timeAgo: "Vừa xong",
      avatar: null,
    };
    setComments((prev) => [...prev, newComment]);
  };

  // Xử lý upload file (chỉ lưu trong state, chưa upload server)
  const handleUploadChange = ({ fileList }) => {
    // fileList chứa thông tin file mới upload
    handleChange("attachments", fileList);
  };

  // Xóa attachment khi editMode
  const handleRemoveAttachment = (file) => {
    const newList = (editedTask.attachments || []).filter(
      (f) => f.uid !== file.uid,
    );
    handleChange("attachments", newList);
  };

  if (!task) {
    return (
      <Card style={{ maxWidth: 700, margin: "auto", marginTop: 50 }}>
        <Text type="danger">Task không tồn tại hoặc không tìm thấy.</Text>
        <Button
          type="link"
          onClick={() => navigate(`/projects/${projectName}`)}
        >
          Quay lại dự án
        </Button>
      </Card>
    );
  }

  return (
    <div className="!p-5 mx-auto space-y-8">
      <Card
        title={
          <Space>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(`/projects/${projectName}`)}
            />
            {editMode ? "Chỉnh sửa task" : "Chi tiết task"}
          </Space>
        }
        extra={
          editMode ? (
            <>
              <Button
                onClick={() => {
                  setEditMode(false);
                  setEditedTask({ ...task });
                }}
                style={{ marginRight: 8 }}
              >
                Hủy
              </Button>
              <Button type="primary" onClick={handleSave}>
                Lưu
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)} type="primary" ghost>
              Sửa
            </Button>
          )
        }
      >
        {/* Các phần khác ... */}

        {/* Tên task */}
        <Title level={4}>Tên task</Title>
        {!editMode ? (
          <Text strong style={{ fontSize: 16 }}>
            {task.name}
          </Text>
        ) : (
          <Input
            value={editedTask.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Tên task"
            autoFocus
          />
        )}
        <Divider />

        {/* Mô tả */}
        <Title level={4}>Mô tả</Title>
        {!editMode ? (
          <Paragraph style={{ whiteSpace: "pre-wrap" }}>
            {task.description || "Chưa có mô tả."}
          </Paragraph>
        ) : (
          <TextArea
            rows={5}
            value={editedTask.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Mô tả chi tiết task"
          />
        )}
        <Divider />

        {/* ... Các phần khác như Người thực hiện, Dự án, Trạng thái, Ưu tiên, Deadline ... */}

        {/* Phần file đính kèm */}
        <Divider />
        <Title level={5}>
          <PaperClipOutlined /> File đính kèm
        </Title>

        {!editMode ? (
          // Hiển thị danh sách file đính kèm khi xem task
          task.attachments && task.attachments.length > 0 ? (
            <List
              dataSource={task.attachments}
              renderItem={(file) => (
                <List.Item key={file.uid || file.name}>
                  <a
                    href={file.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={file.name}
                  >
                    <PaperClipOutlined /> {file.name}
                  </a>
                </List.Item>
              )}
            />
          ) : (
            <Text>Chưa có file đính kèm.</Text>
          )
        ) : (
          <>
            <Upload
              multiple
              fileList={editedTask.attachments || []}
              onChange={handleUploadChange}
              onRemove={handleRemoveAttachment}
              beforeUpload={(file) => {
                // Không tự động upload lên server
                return false;
              }}
              listType="text"
            >
              <Button icon={<UploadOutlined />}>Chọn file</Button>
            </Upload>
            {(!editedTask.attachments ||
              editedTask.attachments.length === 0) && (
              <Text type="secondary">Chưa có file đính kèm.</Text>
            )}
          </>
        )}

        <Divider />

        {/* Bình luận */}
        <Comment
          key={`comments-${task.id}`}
          comments={comments}
          onAddComment={handleAddComment}
        />
      </Card>
    </div>
  );
}
