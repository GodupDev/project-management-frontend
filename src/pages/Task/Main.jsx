import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TaskOverview from "./TaskOverview";
import TaskSpecific from "./TaskSpecific";

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<TaskOverview />} />
      <Route path="/:taskName" element={<TaskSpecific />} />
      <Route path="*" element={<Navigate to="/tasks" replace />} />
    </Routes>
  );
}
