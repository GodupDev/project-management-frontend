import React, { useState } from "react";
import { Card, Button, Input, Select, Space, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TaskBoard from "../../components/ui/task/TaskBoard";
import CreateTask from "../../components/modals/CreateTask";
import { useMockData } from "../../context/MockDataContext";
import { motion as Motion } from "framer-motion";

const { Search } = Input;
const { Option } = Select;

const TaskOverview = () => {
  const navigate = useNavigate();
  const { tasks, updateTasks } = useMockData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const taskStatuses = ["todo", "in-progress", "completed", "blocked"];

  const handleCreateTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now(),
      comments: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updatedTasks = [...tasks, taskWithId];
    updateTasks(updatedTasks);
    setIsCreateModalOpen(false);
    message.success("Task created successfully!");
  };

  const handleTaskClick = (task) => {
    navigate(`/projects/${task.project?.name}/${task.name}`, {
      state: { taskData: task },
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesSearch =
      !searchText ||
      task.name.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      task.project?.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-5">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <Space>
              <Search
                placeholder="Tìm kiếm task..."
                allowClear
                onSearch={setSearchText}
                style={{ width: 200 }}
              />
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={setStatusFilter}
              >
                <Option value="all">Tất cả</Option>
                {taskStatuses.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Tạo Task
            </Button>
          </div>

          <TaskBoard tasks={filteredTasks} onTaskClick={handleTaskClick} />
        </Card>

        <Modal
          title="Tạo Task Mới"
          open={isCreateModalOpen}
          onCancel={() => setIsCreateModalOpen(false)}
          footer={null}
          width={800}
        >
          <CreateTask onSuccess={handleCreateTask} />
        </Modal>
      </div>
    </Motion.div>
  );
};

export default TaskOverview;
