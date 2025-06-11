import React, { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../components/ui/project/ProjectCard";
import CreateProject from "../../components/modals/CreateProject";
import { useProject } from "../../context/ProjectContext";
import { useLanguage } from "../../context/LanguageContext";

const ProjectManagement = () => {
  const navigate = useNavigate();
  const { createProject, projects } = useProject();
  const { t } = useLanguage();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateProject = async (newProject) => {
    try {
      await createProject(newProject);
      setIsCreateModalOpen(false);
      navigate(`/projects/${newProject.name}`);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <div className="p-5 mx-auto space-y-8">
      <div className="flex flex-wrap gap-4 mb-6 justify-between">
        <div className="flex gap-5">
          <select className="px-3 py-2 rounded-md !bg-white text-sm outline-none border-[var(--color-border)] hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <option value="all">{t("allStatus")}</option>
            <option value="inProgress">{t("inProgress")}</option>
            <option value="completed">{t("completed")}</option>
            <option value="onHold">{t("onHold")}</option>
            <option value="cancelled">{t("cancelled")}</option>
          </select>

          <select className="px-3 py-2 rounded-md !bg-white text-sm outline-none border-[var(--color-border)] hover:shadow-md transition-shadow duration-200 cursor-pointer">
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
        {projects.map((project) => (
          <div onClick={() => navigate(`/projects/${project.projectName}`)}>
            {" "}
            <ProjectCard key={project._id} project={project} />
          </div>
        ))}
      </div>

      <Modal
        title={t("createNewProject")}
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={null}
        width={800}
        className="create-project-modal"
      >
        <CreateProject onSuccess={handleCreateProject} />
      </Modal>
    </div>
  );
};

export default ProjectManagement;
