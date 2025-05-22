import { motion as Motion } from "framer-motion";
import { useSidebar } from "../../context/SidebarContext";
import IconProject from "../icons/IconProject";
import IconTask from "../icons/IconTask";
import IconWorkLogs from "../icons/IconWorkLogs";
import IconPerformance from "../icons/IconPerformance";
import IconSetting from "../icons/IconSetting";

const SideBar = () => {
  const { isOpen } = useSidebar();

  const items = [
    { icon: IconProject, label: "Projects" },
    { icon: IconTask, label: "Tasks" },
    { icon: IconWorkLogs, label: "Work Logs" },
    { icon: IconPerformance, label: "Performance" },
    { icon: IconSetting, label: "Setting" },
  ];

  return (
    <Motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`fixed top-[4.5rem] left-0 bottom-0
        bg-[var(--color-background-paper)] w-fit px-2 py-4 space-y-3
        shadow-[var(--shadow-md)] border-r border-[var(--color-border-main)]
        overflow-y-auto
        transition-all duration-300 ease-in-out
        flex flex-col
         ${isOpen ? "" : "pt-[8rem]"}
      `}
    >
      {items.map(({ icon: Icon, label }) => (
        <Motion.button
          key={label}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center h-[2.5rem] gap-3 text-[var(--color-text-secondary)] text-[1rem] 
            rounded-md cursor-pointer
            ${
              isOpen
                ? "min-w-[19rem] justify-start pl-[1em]"
                : "min-w-[4rem] justify-center h-[5rem]"
            }
            hover:text-[var(--color-primary-main)]
            hover:bg-[var(--color-action-hover)]
            transition-all duration-300 ease-in-out
            focus:bg-[var(--color-action-selected)]
            focus:ring-2 focus:ring-[var(--color-primary-main)] focus:ring-opacity-50
            focus:font-medium
            active:bg-[var(--color-action-selected)]`}
          aria-label={label}
          onClick={() => {
            console.log(`${label} clicked`);
          }}
        >
          <Icon className="w-6 h-6 flex-shrink-0" />
          {isOpen && (
            <span className="lg:inline flex justify-center md:hidden sm:hidden">
              {label}
            </span>
          )}
        </Motion.button>
      ))}
    </Motion.div>
  );
};

export default SideBar;
