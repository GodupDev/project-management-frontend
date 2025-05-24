import React from "react";

// Định nghĩa các route
export const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
  PROJECTS: "/projects",
  PROJECTS_CREATE: "/projects/create",
  PROJECTS_SPECIFIC: "/projects/:projectName",
  PROJECTS_TASK: "/projects/:projectName/:taskName",
  TASKS: "/tasks",
  TASKS_CREATE: "/tasks/create",
  TASKS_SPECIFIC: "/tasks/:taskName",
  WORKLOGS: "/worklogs",
  PERFORMANCE: "/performance",
  SETTINGS: "/settings",
};

// Navigation items
export const NAVIGATION_ITEMS = [
  {
    icon: "IconProject",
    label: "Projects",
    path: ROUTES.PROJECTS,
    permissions: ["view_projects"],
  },
  {
    icon: "IconTask",
    label: "Tasks",
    path: ROUTES.TASKS,
    permissions: ["view_tasks"],
  },
  {
    icon: "IconWorkLogs",
    label: "Work Logs",
    path: ROUTES.WORKLOGS,
    permissions: ["view_worklogs"],
  },
  {
    icon: "IconPerformance",
    label: "Performance",
    path: ROUTES.PERFORMANCE,
    permissions: ["view_performance"],
  },
  {
    icon: "IconSetting",
    label: "Setting",
    path: ROUTES.SETTINGS,
    permissions: ["view_settings"],
  },
];

// Helper function to safely decode URI components
const safeDecodeURI = (str) => {
  if (!str) return "";
  try {
    return decodeURIComponent(str);
  } catch (error) {
    console.warn("Error decoding URI:", error);
    return str;
  }
};

// Breadcrumb mapping
const BREADCRUMB_MAP = {
  [ROUTES.HOME]: "Home",
  [ROUTES.PROJECTS]: "Projects",
  [ROUTES.PROJECTS_CREATE]: "Create Project",
  [ROUTES.TASKS]: "Tasks",
  [ROUTES.TASKS_CREATE]: "Create Task",
  [ROUTES.WORKLOGS]: "Work Logs",
  [ROUTES.PERFORMANCE]: "Performance",
  [ROUTES.SETTINGS]: "Settings",
};

// Dynamic breadcrumb mapping
const DYNAMIC_BREADCRUMB_MAP = {
  [ROUTES.PROJECTS_SPECIFIC]: (pathname) => {
    const projectName = pathname.split("/").pop();
    const decodedProjectName = safeDecodeURI(projectName);
    return [
      { label: "Projects", path: ROUTES.PROJECTS },
      {
        label: decodedProjectName,
        path: `/projects/${projectName}`,
        isActive: true,
      },
    ];
  },
  [ROUTES.PROJECTS_TASK]: (pathname) => {
    const parts = pathname.split("/");
    const projectName = parts[2];
    const taskName = parts[3];
    const decodedProjectName = safeDecodeURI(projectName);
    const decodedTaskName = safeDecodeURI(taskName);
    return [
      { label: "Projects", path: ROUTES.PROJECTS },
      {
        label: decodedProjectName,
        path: `/projects/${projectName}`,
      },
      {
        label: decodedTaskName,
        path: `/projects/${projectName}/${taskName}`,
        isActive: true,
      },
    ];
  },
  [ROUTES.TASKS_SPECIFIC]: (pathname) => {
    const taskName = pathname.split("/").pop();
    const decodedTaskName = safeDecodeURI(taskName);
    return [
      { label: "Tasks", path: ROUTES.TASKS },
      {
        label: decodedTaskName,
        path: `/tasks/${taskName}`,
        isActive: true,
      },
    ];
  },
};

export const getBreadcrumbItems = (pathname) => {
  try {
    // Handle root path
    if (pathname === "/") {
      return [{ label: "Home", path: ROUTES.HOME, isActive: true }];
    }

    // Try to match with dynamic routes first
    const dynamicRoute = Object.keys(DYNAMIC_BREADCRUMB_MAP).find((route) => {
      const routePattern = route.replace(/:[^/]+/g, "[^/]+");
      return new RegExp(`^${routePattern}$`).test(pathname);
    });

    if (dynamicRoute) {
      // Handle dynamic route
      const items = DYNAMIC_BREADCRUMB_MAP[dynamicRoute](pathname);
      return items;
    }

    // Handle static route
    const label = BREADCRUMB_MAP[pathname];
    if (label) {
      return [{ label, path: pathname, isActive: true }];
    }

    // If no mapping found, use the path segments
    const paths = pathname.split("/").filter(Boolean);
    const items = [];
    let currentPath = "";

    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const decodedPath = safeDecodeURI(path);
      items.push({
        label: decodedPath,
        path: currentPath,
        isActive: index === paths.length - 1,
      });
    });

    return items;
  } catch (error) {
    console.error("Error generating breadcrumb items:", error);
    return [{ label: "Home", path: ROUTES.HOME, isActive: true }];
  }
};
