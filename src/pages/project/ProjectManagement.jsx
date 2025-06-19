<<<<<<< HEAD
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
=======
import React, { useState, useEffect } from "react";
import { Button, Modal, Empty, Input, DatePicker, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
>>>>>>> origin/main
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import ProjectCard from "../../components/ui/project/ProjectCard";
<<<<<<< HEAD
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
=======
import CreateProjectForm from "../../components/modals/CreateProject";
import { useProject } from "../../context/ProjectContext";
import { useSearch } from "../../context/SearchContext";
import { useLanguage } from "../../context/LanguageContext";

import { StyledPagination } from "../../components/styledAntd";

const { RangePicker } = DatePicker;

const ProjectManagement = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { projects = [], getAllProjects, loading, total } = useProject();
  const { searchTerm } = useSearch();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("desc");
  const [dateRange, setDateRange] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Fetch projects with filters
  useEffect(() => {
    const [from, to] = dateRange;
    getAllProjects({
      status: statusFilter !== "all" ? statusFilter : undefined,
      sort: sortFilter,
      search: searchTerm || undefined,
      from: from ? dayjs(from).format("YYYY-MM-DD") : undefined,
      to: to ? dayjs(to).format("YYYY-MM-DD") : undefined,
      page,
      limit,
    });
  }, [statusFilter, sortFilter, searchTerm, dateRange, page, limit, total]);

  const handleNavigate = (project) => {
    navigate(`/projects/${project._id}`, {
      state: {
        id: project._id,
        pathnames: ["Project", project.projectName],
      },
    });
>>>>>>> origin/main
  };

  return (
    <div className="p-5 mx-auto space-y-8">
<<<<<<< HEAD
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
=======
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
        <Space wrap className="gap-4">
          <select
            className="px-3 py-2 rounded-md !bg-white text-sm outline-none border border-gray-300 hover:shadow transition"
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
          >
            <option value="all">{t("allStatus")}</option>
            <option value="active">{t("active")}</option>
            <option value="completed">{t("completed")}</option>
            <option value="cancelled">{t("cancelled")}</option>
          </select>

          <select
            className="px-3 py-2 rounded-md !bg-white text-sm outline-none border border-gray-300 hover:shadow transition"
            value={sortFilter}
            onChange={(e) => {
              setPage(1);
              setSortFilter(e.target.value);
            }}
          >
            <option value="desc">{t("newestFirst")}</option>
            <option value="asc">{t("oldestFirst")}</option>
>>>>>>> origin/main
          </select>

          <RangePicker
            value={dateRange}
            onChange={(range) => {
              setPage(1);
              setDateRange(range || []);
            }}
            allowClear
            format="DD/MM/YYYY"
            className="!w-64 !bg-white !border !border-gray-300 !rounded-md !px-3 !py-2"
            placeholder={[t("fromDate"), t("toDate")]}
            inputReadOnly
            style={{
              background: "#fff",
              borderColor: "#cbd5e1",
              borderRadius: 6,
              padding: "6px 12px",
              height: 40,
            }}
          />
        </Space>

        <Button
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
          type="primary"
        >
          {t("createProject")}
        </Button>
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div onClick={() => navigate(`/projects/${project.projectName}`)}>
            {" "}
            <ProjectCard key={project._id} project={project} />
          </div>
        ))}
      </div>

=======
      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Empty description={t("loading")} />
          </div>
        ) : projects?.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Empty description={t("noProjects")} />
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => handleNavigate(project)}
              className="cursor-pointer"
            >
              <ProjectCard project={project} />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && projects?.length > 0 && (
        <div className="flex flex-col items-center pt-8 gap-2">
          <StyledPagination
            current={page}
            pageSize={limit}
            total={typeof total === "number" ? total : 0}
            onChange={(p, l) => {
              setPage(p);
              setLimit(l);
            }}
            showSizeChanger
            pageSizeOptions={["5", "10", "15", "20"]}
          />
          <span className="text-gray-500 text-sm">
            {t("totalProjects")}: <b>{total}</b>
          </span>
        </div>
      )}

      {/* Create Project Modal */}
>>>>>>> origin/main
      <Modal
        title={t("createNewProject")}
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={null}
        width={800}
      >
<<<<<<< HEAD
        <CreateProject onSuccess={handleCreateProject} />
=======
        <CreateProjectForm setIsCreateModalOpen={setIsCreateModalOpen} />
>>>>>>> origin/main
      </Modal>
    </div>
  );
};

export default ProjectManagement;
