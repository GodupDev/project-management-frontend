import React, { useState } from "react";
import { Button, Typography, Modal, Card, Tag, Avatar, message } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../components/ui/project/ProjectCard";
import Pagination from "../../components/ui/Pagination";
import CreateProject from "../../components/modals/CreateProject";
import { useMockData } from "../../context/MockDataContext";
import { useLanguage } from "../../context/LanguageContext";

const { Title } = Typography;

const ProjectManagement = () => {
  const navigate = useNavigate();
  const { projects, updateProjects } = useMockData();
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const pageSize = 6;

  const projectStatuses = [
    t("inProgress"),
    t("completed"),
    t("onHold"),
    t("cancelled"),
  ];
  const projectTypes = [
    t("development"),
    t("design"),
    t("marketing"),
    t("research"),
  ];

  const filteredProjects = projects.filter(
    (project) => statusFilter === "all" || project.status === statusFilter,
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    switch (sortOption) {
      case "newest":
        return dateB - dateA;
      case "oldest":
        return dateA - dateB;
      case "mostIssues":
        return b.totalTasks - a.totalTasks;
      case "fewestIssues":
        return a.totalTasks - b.totalTasks;
      default:
        return 0;
    }
  });

  const displayedProjects = sortedProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleCreateProject = (newProject) => {
    const updatedProjects = [...projects, { ...newProject, id: Date.now() }];
    updateProjects(updatedProjects);
    setIsCreateModalOpen(false);
    message.success(t("projectCreatedSuccess"));
    navigate(`/projects/${newProject.name}`);
  };

  return (
    <div className="p-5 mx-auto space-y-8">
      <div className="flex flex-wrap gap-4 mb-6 justify-between">
        <div className="flex gap-5">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md !bg-[var(--color-background-paper)] text-sm outline-none border-[var(--color-border)] hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <option value="all">{t("allStatus")}</option>
            {projectStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 rounded-md !bg-[var(--color-background-paper)] text-sm outline-none border-[var(--color-border)] hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <option value="newest">{t("newestFirst")}</option>
            <option value="oldest">{t("oldestFirst")}</option>
            <option value="mostIssues">{t("mostTasks")}</option>
            <option value="fewestIssues">{t("fewestTasks")}</option>
          </select>
        </div>

        <Button
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
          className="!text-[var(--color-primary-contrast)] 
        transition-all duration-300
          focus:!ring-2 focus:!ring-[var(--color-primary-light)] focus:!ring-opacity-50"
          type="primary"
        >
          {t("createProject")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project) => (
          <Card
            key={project.id}
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/projects/${project.name}`)}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <Tag
                  color={
                    project.status === t("completed")
                      ? "green"
                      : project.status === t("inProgress")
                      ? "blue"
                      : project.status === t("onHold")
                      ? "orange"
                      : "gray"
                  }
                >
                  {project.status}
                </Tag>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">
                    {new Date(project.startDate).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {project.completedTasks}/{project.totalTasks} {t("tasks")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.members?.map((member) => (
                      <Avatar
                        key={member.user?.id || member.id}
                        src={member.user?.avatar}
                        size="small"
                        className="border-2 border-white"
                        icon={<UserOutlined />}
                      >
                        {member.user?.fullName?.charAt(0) ||
                          member.name?.charAt(0)}
                      </Avatar>
                    ))}
                  </div>
                  <Button
                    type="link"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${project.name}`);
                    }}
                  >
                    {t("viewDetails")}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        current={currentPage}
        total={filteredProjects.length}
        pageSize={pageSize}
        onChange={setCurrentPage}
      />

      <Modal
        title={t("createNewProject")}
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={null}
        width={800}
        className="create-project-modal"
      >
        <CreateProject
          onSuccess={handleCreateProject}
          projectTypes={projectTypes}
          projectStatuses={projectStatuses}
        />
      </Modal>
    </div>
  );
};

export default ProjectManagement;
