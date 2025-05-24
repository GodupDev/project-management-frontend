import { users } from "./users";

export const projects = [
  {
    id: 1,
    name: "Website A",
    description:
      "Development of company website with modern design and features",
    type: "Web Development",
    status: "In Progress",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    members: [
      {
        user: users[1],
        role: "Project Manager",
      },
      {
        user: users[2],
        role: "Developer",
      },
      {
        user: users[3],
        role: "Developer",
      },
    ],
    progress: 65,
    totalTasks: 24,
    completedTasks: 16,
  },
  {
    id: 2,
    name: "Mobile App B",
    description: "Cross-platform mobile application for customer service",
    type: "Mobile Development",
    status: "Planning",
    startDate: "2025-03-01",
    endDate: "2025-08-31",
    members: [
      {
        user: users[1],
        role: "Project Manager",
      },
      {
        user: users[2],
        role: "Lead Developer",
      },
      {
        user: users[4],
        role: "QA Tester",
      },
    ],
    progress: 20,
    totalTasks: 18,
    completedTasks: 4,
  },
  {
    id: 3,
    name: "API Integration",
    description: "Integration of third-party APIs and services",
    type: "Backend Development",
    status: "Completed",
    startDate: "2024-12-01",
    endDate: "2025-02-28",
    members: [
      {
        user: users[2],
        role: "Developer",
      },
      {
        user: users[3],
        role: "Developer",
      },
    ],
    progress: 100,
    totalTasks: 12,
    completedTasks: 12,
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Migration of legacy database to new cloud infrastructure",
    type: "DevOps",
    status: "On Hold",
    startDate: "2025-02-15",
    endDate: "2025-04-30",
    members: [
      {
        user: users[1],
        role: "Project Manager",
      },
      {
        user: users[2],
        role: "DevOps Engineer",
      },
    ],
    progress: 30,
    totalTasks: 8,
    completedTasks: 2,
  },
];

export const projectTypes = [
  "Web Development",
  "Mobile Development",
  "Backend Development",
  "DevOps",
  "UI/UX Design",
  "Quality Assurance",
  "Research & Development",
];

export const projectStatuses = [
  "Planning",
  "In Progress",
  "On Hold",
  "Completed",
  "Cancelled",
];
