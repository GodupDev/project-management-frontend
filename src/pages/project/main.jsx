import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Typography } from "antd";
import ProjectManagement from "./ProjectManagement";
import ProjectSpecific from "./ProjectSpecific";
import TaskSpecific from "../task/TaskSpecific";

const { Title } = Typography;

// Define base path constant for better maintainability
const PROJECTS_BASE_PATH = "/projects";

const Main = () => {
  return (
    <Routes>
      <Route index element={<ProjectManagement />} />
      <Route path=":projectName" element={<ProjectSpecific />} />
      <Route path=":projectName/:taskName" element={<TaskSpecific />} />
      <Route
        path="*"
        element={
          <Navigate
            to={PROJECTS_BASE_PATH}
            replace
            state={{ from: "invalid-route" }}
          />
        }
      />
    </Routes>
  );
};

export default Main;
