import React, { createContext, useContext, useState } from "react";
import { settings } from "../mockdata/settings";
import { projects } from "../mockdata/projects";
import { tasks } from "../mockdata/tasks";
import { users } from "../mockdata/users";
import { worklogs } from "../mockdata/worklogs";

const MockDataContext = createContext();

export function useMockData() {
  return useContext(MockDataContext);
}

export function MockDataProvider({ children }) {
  const [projectsData, setProjectsData] = useState(projects);
  const [tasksData, setTasksData] = useState(tasks);
  const [usersData, setUsersData] = useState(users);
  const [worklogsData, setWorklogsData] = useState(worklogs);
  const [settingsData, setSettingsData] = useState(settings);
  const [notificationsData, setNotificationsData] = useState([
    {
      id: 1,
      type: "task",
      title: "New Task Assigned",
      message: "You have been assigned to 'Implement Login Feature'",
      time: "5 minutes ago",
      status: "unread",
    },
    {
      id: 2,
      type: "project",
      title: "Project Update",
      message: "Project 'Website Redesign' has been updated",
      time: "1 hour ago",
      status: "unread",
    },
    {
      id: 3,
      type: "mention",
      title: "New Mention",
      message: "John Doe mentioned you in a comment",
      time: "2 hours ago",
      status: "read",
    },
    {
      id: 4,
      type: "task",
      title: "Task Completed",
      message: "Task 'Fix Navigation Bug' has been completed",
      time: "3 hours ago",
      status: "read",
    },
    {
      id: 5,
      type: "project",
      title: "New Project Member",
      message: "Sarah Smith joined the project 'Mobile App Development'",
      time: "1 day ago",
      status: "read",
    },
  ]);

  const updateProjects = (newProjects) => {
    setProjectsData(newProjects);
  };

  const updateTasks = (newTasks) => {
    setTasksData(newTasks);
  };

  const updateUsers = (newUsers) => {
    setUsersData(newUsers);
  };

  const updateWorklogs = (newWorklogs) => {
    setWorklogsData(newWorklogs);
  };

  const updateSettings = (section, newData) => {
    setSettingsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...newData,
      },
    }));
  };

  const updateNotifications = (newNotifications) => {
    setNotificationsData(newNotifications);
  };

  const value = {
    projects: projectsData,
    tasks: tasksData,
    users: usersData,
    worklogs: worklogsData,
    settings: settingsData,
    notifications: notificationsData,
    updateProjects,
    updateTasks,
    updateUsers,
    updateWorklogs,
    updateSettings,
    updateNotifications,
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
}

export default MockDataContext;
