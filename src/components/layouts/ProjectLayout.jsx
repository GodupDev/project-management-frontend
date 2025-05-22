import { useSidebar } from "../../context/SidebarContext";
import Header from "./Header";
import SideBar from "./SideBar";

const ProjectLayout = ({ children }) => {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-[var(--color-background-default)] text-[var(--color-text-primary)] transition-colors duration-300">
      <Header />
      <div className="flex min-h-screen pt-[4.5rem]">
        <SideBar />
        <div
          className={`flex-1 transition-all duration-300 ${
            isOpen ? "ml-[20rem]" : "ml-[5rem]"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;
