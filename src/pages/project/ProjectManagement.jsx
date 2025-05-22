import React, { useState } from "react";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProjectCard from "../../components/ui/project/ProjectCard";
import Pagination from "../../components/ui/Pagination";

const { Title } = Typography;

const projects = new Array(12).fill(null).map((_, idx) => ({
  id: idx + 1,
  name: "Adoddle",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
  status: idx % 2 === 0 ? "on track" : "off track",
  date: `2025-04-${(idx % 30) + 1}`,
  team: [
    "https://i.pravatar.cc/40?img=1",
    "https://i.pravatar.cc/40?img=2",
    "https://i.pravatar.cc/40?img=3",
    "https://i.pravatar.cc/40?img=4",
    "https://i.pravatar.cc/40?img=5",
  ],
  issues: Math.floor(Math.random() * 20),
}));

const ProjectManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const pageSize = 6;

  const filtered = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "mostIssues") {
      return b.issues - a.issues;
    } else if (sortBy === "fewestIssues") {
      return a.issues - b.issues;
    }
    return 0;
  });

  const paginated = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="p-6 min-h-screen bg-[var(--color-background-default)]">
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="!text-[var(--color-text-primary)]">
          Projects
        </Title>
      </div>

      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-md bg-[var(--color-background-paper)] w-[9rem]"
          >
            <option value="all">All Statuses</option>
            <option value="on track">On Track</option>
            <option value="off track">Off Track</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-md bg-[var(--color-background-paper)] w-[9rem]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostIssues">Most Issues</option>
            <option value="fewestIssues">Fewest Issues</option>
          </select>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] border-none px-4 py-2"
        >
          Create
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProjectManagement;
