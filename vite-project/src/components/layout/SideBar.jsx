import { motion } from "framer-motion";

import IconProject from "../icons/IconProject";
import IconTask from "../icons/IconTask";
import IconWorkLogs from "../icons/IconWorkLogs";
import IconPerformance from "../icons/IconPerformance";
import IconSetting from "../icons/IconSetting";

const SideBar = () => {
  const items = [
    { icon: IconProject, label: "Projects" },
    { icon: IconTask, label: "Tasks" },
    { icon: IconWorkLogs, label: "Work Logs" },
    { icon: IconPerformance, label: "Performance" },
    { icon: IconSetting, label: "Setting" },
  ];

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white/80 h-screen w-[12rem] px-2 py-4 space-y-3 shadow-md"
    >
      {items.map(({ icon: Icon, label }) => (
        <motion.button
          key={label}
          whileTap={{ scale: 0.95 }}
          className="flex items-center w-[10rem] h-[2rem]
                     gap-1 text-[#5D7285] text-[0.8rem] 
                     px-1 py-2 rounded-md 
                     hover:text-blue-600 hover:bg-blue-100 
                     transition-colors duration-300 ease-in-out
                      focus:bg-blue-100  focus:ring-blue-400"
          aria-label={label}
          onClick={() => {
            console.log(`${label} clicked`);
          }}
        >
          <Icon />
          <span>{label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default SideBar;
