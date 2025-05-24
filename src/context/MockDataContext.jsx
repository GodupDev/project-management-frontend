import React, { createContext, useContext, useState } from "react";

const MockDataContext = createContext();

export function useMockData() {
  return useContext(MockDataContext);
}

export function MockDataProvider({ children }) {
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Website Redesign",
      description: "Redesign the company website with modern UI/UX",
      status: "in_progress",
      managerId: "1",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      createdAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Develop a new mobile app for iOS and Android",
      status: "not_started",
      managerId: "2",
      startDate: "2024-02-01",
      endDate: "2024-08-31",
      createdAt: "2024-01-15T00:00:00.000Z",
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Design Homepage",
      description: "Create new homepage design with modern look",
      projectId: "1",
      status: "in_progress",
      priority: "high",
      assignedTo: "1",
      dueDate: "2024-02-15",
      createdAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Implement Navigation",
      description: "Implement responsive navigation menu",
      projectId: "1",
      status: "todo",
      priority: "medium",
      assignedTo: "2",
      dueDate: "2024-02-28",
      createdAt: "2024-01-02T00:00:00.000Z",
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "manager",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "developer",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  ]);

  const [worklogs, setWorklogs] = useState([
    {
      id: "1",
      taskId: "1",
      userId: "1",
      hours: 4,
      description: "Worked on homepage design",
      date: "2024-01-15",
      createdAt: "2024-01-15T00:00:00.000Z",
    },
    {
      id: "2",
      taskId: "2",
      userId: "2",
      hours: 2,
      description: "Started navigation implementation",
      date: "2024-01-16",
      createdAt: "2024-01-16T00:00:00.000Z",
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Task Assigned",
      message: "You have been assigned to 'Design Homepage'",
      read: false,
      createdAt: "2024-01-15T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Project Update",
      message: "Website Redesign project status updated to 'In Progress'",
      read: true,
      createdAt: "2024-01-14T00:00:00.000Z",
    },
  ]);

  const updateProject = (id, data) => {
    if (id) {
      setProjects(projects.map((p) => (p.id === id ? { ...p, ...data } : p)));
    } else {
      setProjects([...projects, data]);
    }
  };

  const updateTask = (id, data) => {
    if (id) {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, ...data } : t)));
    } else {
      setTasks([...tasks, data]);
    }
  };

  const value = {
    projects,
    tasks,
    users,
    worklogs,
    notifications,
    updateProject,
    updateTask,
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
}

export default MockDataContext;
