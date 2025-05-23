import React, { useState } from "react";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../components/ui/project/ProjectCard";
import Pagination from "../../components/ui/Pagination";

const { Title } = Typography;

// Dummy data
const projects = Array.from({ length: 12 }, (_, idx) => ({
  id: idx + 1,
  name: "Adoddle",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  status: idx % 2 === 0 ? "on track" : "off track",
  date: `2025-04-${((idx % 30) + 1).toString().padStart(2, "0")}`,
  team: Array.from(
    { length: 5 },
    (_, i) => `https://i.pravatar.cc/40?img=${i + 1}`,
  ),
  issues: Math.floor(Math.random() * 20),
}));

const ProjectManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const pageSize = 6;

  const filteredProjects = projects.filter(
    (project) => statusFilter === "all" || project.status === statusFilter,
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    switch (sortOption) {
      case "newest":
        return dateB - dateA;
      case "oldest":
        return dateA - dateB;
      case "mostIssues":
        return b.issues - a.issues;
      case "fewestIssues":
        return a.issues - b.issues;
      default:
        return 0;
    }
  });

  const displayedProjects = sortedProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="p-2 min-h-screen bg-[var(--color-background-default)]">
      <div className="flex justify-between items-center mb-2">
        <Title level={3} className="!text-[var(--color-text-primary)]">
          Projects
        </Title>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 justify-between">
        <div className="flex gap-5">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md !bg-[var(--color-background-paper)] text-sm outline-none border-[var(--color-border)] hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <option key="all" value="all">
              All Statuses
            </option>
            <option key="on-track" value="on track">
              On Track
            </option>
            <option key="off-track" value="off track">
              Off Track
            </option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 rounded-md bg-[var(--color-background-paper)] text-sm outline-none border-[var(--color-border)] hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <option key="newest" value="newest">
              Newest
            </option>
            <option key="oldest" value="oldest">
              Oldest
            </option>
            <option key="mostIssues" value="mostIssues">
              Most Issues
            </option>
            <option key="fewestIssues" value="fewestIssues">
              Fewest Issues
            </option>
          </select>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/projects/create")}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] border-none"
        >
          Create
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="flex justify-center mt-3">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredProjects.length}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProjectManagement;
