import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Typography } from "antd";
import ProjectManagement from "./ProjectManagement";
import ProjectSpecific from "./ProjectSpecific";
import TaskSpecific from "../task/TaskSpecific";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const { Title } = Typography;

// Define base path constant for better maintainability
const PROJECTS_BASE_PATH = "/projects";

const Main = () => {
  const { t } = useLanguage();

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Routes>
        <Route index element={<ProjectManagement />} />
        <Route path=":projectId" element={<ProjectSpecific />} />
        <Route path=":projectId/:taskId" element={<TaskSpecific />} />
        <Route
          path="*"
          element={
            <Navigate
              to={PROJECTS_BASE_PATH}
              replace
              state={{ from: t("invalidRoute") }}
            />
          }
        />
      </Routes>
    </Motion.div>
  );
};

export default Main;
