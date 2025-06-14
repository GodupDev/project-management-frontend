import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useLanguage } from "./LanguageContext";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectMembers,
  getProjectMembers,
  updateProjectMember,
} from "../store/slices/projectSlice";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState("");
  const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);

  // Get project data from Redux store
  const { projects, loading, total, page, limit } = useSelector(
    (state) => state.project,
  );
  // Handle getting all projects
  const handleGetAllProjects = async (filter = {}) => {
    try {
      // Nếu backend hỗ trợ filter, truyền filter vào action getAllProjects(filter)
      const result = await dispatch(getAllProjects(filter)).unwrap();
      console.log(projects);
      setIsProjectsLoaded(true);
      return result;
      // ...phần filter ở client giữ lại để fallback nếu cần...
    } catch (error) {
      message.error(error.message || t("projectGetFailed"));
      throw error;
    }
  };

  // Handle project creation
  const handleCreateProject = async (projectData) => {
    try {
      // Check if project with same name already exists
      const existingProject = projects.find(
        (p) => p.projectName === projectData.projectName,
      );
      if (existingProject) {
        message.error(t("projectNameExists"));
        return null;
      }

      const result = await dispatch(createProject(projectData)).unwrap();
      // Update local projects list
      return result;
    } catch (error) {
      message.error(error.message || t("projectCreateFailed"));
      throw error;
    }
  };

  // Handle project update
  const handleUpdateProject = async (projectId, projectData) => {
    try {
      const result = await dispatch(
        updateProject({ projectId, projectData }),
      ).unwrap();
      message.success(t("projectUpdatedSuccess"));
      return result;
    } catch (error) {
      message.error(error.message || t("projectUpdateFailed"));
      throw error;
    }
  };

  // Handle project deletion
  const handleDeleteProject = async (projectId) => {
    try {
      await dispatch(deleteProject(projectId)).unwrap();
      message.success(t("projectDeletedSuccess"));
    } catch (error) {
      message.error(error.message || t("projectDeleteFailed"));
      throw error;
    }
  };

  // Handle getting project by ID
  const handleGetProjectById = async (projectId) => {
    try {
      const result = await dispatch(getProjectById(projectId)).unwrap();
      return result;
    } catch (error) {
      message.error(error.message || t("projectGetFailed"));
      throw error;
    }
  };

  // Handle adding project members
  const handleAddProjectMembers = async (projectId, members) => {
    try {
      const result = await dispatch(
        addProjectMembers({ projectId, members }),
      ).unwrap();
      message.success(t("memberAddedSuccess"));
      return result;
    } catch (error) {
      message.error(error.message || t("memberAddFailed"));
      throw error;
    }
  };

  // Handle getting project members
  const handleGetProjectMembers = async (projectId) => {
    try {
      const result = await dispatch(getProjectMembers(projectId)).unwrap();
      return result;
    } catch (error) {
      message.error(error.message || t("memberGetFailed"));
      throw error;
    }
  };

  // Handle updating project member
  const handleUpdateProjectMember = async (projectId, memberId, memberData) => {
    try {
      const result = await dispatch(
        updateProjectMember({ projectId, memberId, memberData }),
      ).unwrap();
      message.success(t("memberUpdatedSuccess"));
      return result;
    } catch (error) {
      message.error(error.message || t("memberUpdateFailed"));
      throw error;
    }
  };

  const value = {
    projects,
    total,
    loading,
    prompt,
    setPrompt,
    isProjectsLoaded,
    getAllProjects: handleGetAllProjects,
    createProject: handleCreateProject,
    updateProject: handleUpdateProject,
    deleteProject: handleDeleteProject,
    getProjectById: handleGetProjectById,
    addProjectMembers: handleAddProjectMembers,
    getProjectMembers: handleGetProjectMembers,
    updateProjectMember: handleUpdateProjectMember,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      context?.t("errorUseProject") ||
        "useProject must be used within a ProjectProvider",
    );
  }
  return context;
};
