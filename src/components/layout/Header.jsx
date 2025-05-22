import { motion as Motion } from "framer-motion";
import { Image } from "antd";
import { useSidebar } from "../../context/SidebarContext";
import SearchBar from "../ui/SearchBar";
import IMAGE from "../../assets/images/images";
import IconNotification from "../icons/IconNotification";
import IconThemeToggle from "../icons/IconThemeToggle";
import IconMenu from "../icons/IconMenu";

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-background-paper)] px-6 py-3 shadow-[var(--shadow-md)] 
                 transition-colors duration-300 border-b border-[var(--color-border-main)]"
    >
      <div className="flex w-full items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-[2rem]">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-[var(--color-background-elevated)] 
                     hover:bg-[var(--color-action-hover)]
                     text-[var(--color-text-secondary)]
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-main)] focus:ring-opacity-50
                     active:bg-[var(--color-action-selected)]
                     shadow-[var(--shadow-sm)] cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <IconMenu />
          </button>
          <div className="flex items-center gap-2">
            <Image width={50} src={IMAGE.LOGO} preview={false} className="" />
            <h1 className="text-[1.5em] font-semibold text-[var(--color-text-primary)]">
              PMS Team4.1
            </h1>
          </div>
        </div>

        {/* Right Content: Search, Notification, Profile */}
        <div className="flex items-center justify-end gap-6 w-[50rem]">
          <div className="md:block hidden w-[100%]">
            <SearchBar />
          </div>
          <IconThemeToggle />
          <button
            className="p-2 rounded-lg bg-[var(--color-background-elevated)] 
                 hover:bg-[var(--color-action-hover)]
                 text-[var(--color-text-secondary)]
                 transition-all duration-300
                 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-main)] focus:ring-opacity-50
                 active:bg-[var(--color-action-selected)]
                 shadow-[var(--shadow-sm)] cursor-pointer"
          >
            <IconNotification />
          </button>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right flex-1">
              <p className="text-[1rem] font-medium text-[var(--color-text-primary)] truncate">
                Full Name
              </p>
              <p className="text-[0.7rem] text-[var(--color-text-secondary)] truncate">
                Address
              </p>
            </div>
            <Image
              width={40}
              height={40}
              src="https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
              preview={false}
              className="rounded-full object-cover border-2 border-[var(--color-border-light)] 
                         shadow-[var(--shadow-sm)]"
            />
          </div>
        </div>
      </div>
      <div className="sm:hidden flex justify-center">
        <SearchBar />
      </div>
    </Motion.div>
  );
};

export default Header;
