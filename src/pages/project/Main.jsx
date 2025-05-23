import { Routes, Route, Navigate } from "react-router-dom";
import ProjectManagement from "./ProjectManagement";
import CreateProject from "./CreateProject";
import ProjectSpecific from "./ProjectSpecific";

const Main = () => {
  return (
    <Routes>
      <Route index element={<ProjectManagement />} />
      <Route path="create" element={<CreateProject />} />
      <Route path=":projectName" element={<ProjectSpecific />} />
    </Routes>
  );
};

export default Main;
