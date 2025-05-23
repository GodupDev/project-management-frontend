import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
  Outlet,
} from "react-router-dom";
import { Typography } from "antd";
import ProjectManagement from "./ProjectManagement";
import CreateProject from "./CreateProject";
import ProjectSpecific from "./ProjectSpecific";

const { Title } = Typography;

const TemplateProject = () => {
  const { projectName } = useParams();
  const location = useLocation();

  let titleSuffix = "Management";
  if (location.pathname.includes("/create")) {
    titleSuffix = "Create Project";
  } else if (projectName) {
    titleSuffix = projectName;
  }

  return (
    <div className="p-2 min-h-screen">
      <Title
        level={3}
        className="mb-4 !text-[var(--color-text-primary)] w-full"
      >
        Projects / {titleSuffix}
      </Title>
      <Outlet />
    </div>
  );
};

const Main = () => {
  return (
    <Routes>
      <Route element={<TemplateProject />}>
        <Route index element={<ProjectManagement />} />
        <Route path="create" element={<CreateProject />} />
        <Route path=":projectName" element={<ProjectSpecific />} />
      </Route>
    </Routes>
  );
};

export default Main;
