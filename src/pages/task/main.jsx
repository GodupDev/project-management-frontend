import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TaskOverview from "./TaskOverview";
import TaskSpecific from "./TaskSpecific";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const TaskMain = () => {
  const { t } = useLanguage();

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Routes>
        <Route path="/" element={<TaskOverview />} />
        <Route path="/:taskName" element={<TaskSpecific />} />
        <Route
          path="*"
          element={
            <Navigate to="/tasks" replace state={{ from: t("invalidRoute") }} />
          }
        />
      </Routes>
    </Motion.div>
  );
};

export default TaskMain;
