import "./app.css";
import Header from "./components/layouts/Header";
import SideBar from "./components/layouts/SideBar";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProjectManagement from "./pages/project/ProjectManagement";
import CreateProject from "./pages/project/CreateProject";
import ProjectSpecific from "./pages/project/ProjectSpecific";

function AppContent() {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-[var(--color-background-default)] text-[var(--color-text-primary)] transition-colors duration-300">
      <Header />
      <div className="flex min-h-screen pt-[4.5rem]">
        <SideBar />
        <div
          className={`flex-1 p-6 bg-[var(--color-background-default)] ${
            isOpen ? "ml-[20rem]" : "ml-[5rem]"
          }`}
        >
          <Routes>
            <Route path="/" />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route
              path="/projects/:projectName"
              element={<ProjectSpecific />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
