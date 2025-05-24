import { users } from "./users";
import { projects } from "./projects";

export const tasks = [
  {
    id: 1,
    name: "Fix login bug",
    description:
      "There is a bug preventing login on mobile devices. Need to investigate and fix the authentication flow.",
    project: projects[0],
    status: "In Progress",
    priority: "High",
    assignees: [users[2], users[3]],
    deadline: "2025-05-26",
    createdAt: "2025-05-01",
    comments: [
      {
        id: 1,
        sender: users[2],
        content:
          "Found the issue in the authentication middleware. Working on a fix.",
        timeAgo: "2 hours ago",
        replies: [
          {
            id: 11,
            sender: users[3],
            content: "Let me know if you need help testing the fix.",
            timeAgo: "1 hour ago",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Add dashboard",
    description:
      "Design and implement the dashboard UI with key metrics and charts.",
    project: projects[0],
    status: "Review",
    priority: "Medium",
    assignees: [users[3]],
    deadline: "2025-05-28",
    createdAt: "2025-04-20",
    comments: [],
  },
  {
    id: 3,
    name: "API Documentation",
    description:
      "Create comprehensive API documentation for the new endpoints.",
    project: projects[2],
    status: "Completed",
    priority: "Low",
    assignees: [users[2]],
    deadline: "2025-02-15",
    createdAt: "2025-01-20",
    comments: [
      {
        id: 2,
        sender: users[2],
        content: "Documentation completed and reviewed by the team.",
        timeAgo: "1 month ago",
      },
    ],
  },
  {
    id: 4,
    name: "Mobile UI Testing",
    description: "Test the mobile UI on various devices and screen sizes.",
    project: projects[1],
    status: "To Do",
    priority: "Medium",
    assignees: [users[4]],
    deadline: "2025-06-15",
    createdAt: "2025-05-10",
    comments: [],
  },
  {
    id: 5,
    name: "Database Backup",
    description: "Set up automated database backup system with cloud storage.",
    project: projects[3],
    status: "In Progress",
    priority: "High",
    assignees: [users[2]],
    deadline: "2025-03-30",
    createdAt: "2025-02-20",
    comments: [
      {
        id: 3,
        sender: users[2],
        content: "Configured backup schedule and testing restore process.",
        timeAgo: "1 week ago",
      },
    ],
  },
];

export const taskStatuses = [
  "To Do",
  "In Progress",
  "Review",
  "Completed",
  "Cancelled",
];

export const taskPriorities = ["High", "Medium", "Low", "None"];
