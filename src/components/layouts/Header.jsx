import { motion as Motion } from "framer-motion";
import { Image } from "antd";
import { useSidebar } from "../../context/SidebarContext";
import { useMockData } from "../../context/MockDataContext";
import SearchBar from "../ui/SearchBar";
import IMAGE from "../../assets/images/images";
import IconThemeToggle from "../icons/IconThemeToggle";
import IconMenu from "../icons/IconMenu";
import IconNotification from "../icons/IconNotification";
import { useState, useRef, useEffect } from "react";
import ProfileModal from "../modals/ProfileModal";
import NotificationDropdown from "../dropdown/NotificationDropdown";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { settings, notifications } = useMockData();
  const { userProfile } = settings;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifRef = useRef(null);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationOpen]);

  const handleViewAllNotifications = () => {
    console.log("View all notifications");
    setIsNotificationOpen(false);
    // Your logic to navigate or show full notifications page
  };

  // Tính số thông báo chưa đọc
  const unreadCount = notifications.filter((n) => n.status === "unread").length;

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
            <Image width={50} src={IMAGE.LOGO} preview={false} />
            <h1 className="text-[1.5em] font-semibold text-[var(--color-text-primary)]">
              PMS Team4.1
            </h1>
          </div>
        </div>

        {/* Right Content: Search, Notification, Profile */}
        <div className="flex items-center justify-end gap-6 w-[50rem] relative">
          <div className="md:block hidden w-[100%]">
            <SearchBar />
          </div>
          <IconThemeToggle />
          <button
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            className="relative p-2 rounded-lg bg-[var(--color-background-elevated)] 
                       hover:bg-[var(--color-action-hover)]
                       text-[var(--color-text-secondary)]
                       transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-main)] focus:ring-opacity-50
                       active:bg-[var(--color-action-selected)]
                       shadow-[var(--shadow-sm)] cursor-pointer"
            aria-label="Toggle notifications"
            aria-expanded={isNotificationOpen}
            aria-haspopup="true"
            ref={notifRef}
          >
            {/* Truyền số notification chưa đọc */}
            <IconNotification count={unreadCount} />
          </button>

          {isNotificationOpen && (
            <div ref={notifRef} className="absolute right-0 top-full mt-2 z-50">
              <NotificationDropdown
                notifications={notifications}
                onViewAll={handleViewAllNotifications}
              />
            </div>
          )}

          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-[var(--color-action-hover)] p-2 rounded-lg transition-all duration-300"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <div className="text-right flex-1">
              <p className="text-[1rem] font-medium text-[var(--color-text-primary)] truncate">
                {userProfile.fullName}
              </p>
              <p className="text-[0.7rem] text-[var(--color-text-secondary)] truncate">
                {userProfile.role}
              </p>
            </div>
            <Image
              width={40}
              height={40}
              src={userProfile.avatar}
              preview={false}
              className="rounded-full object-cover border-2 border-[var(--color-border-light)] 
                         shadow-[var(--shadow-sm)]"
            />
          </div>
        </div>
      </div>

      <div className="sm:hidden flex justify-center mt-2">
        <SearchBar />
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={userProfile}
      />
    </Motion.div>
  );
};

export default Header;
