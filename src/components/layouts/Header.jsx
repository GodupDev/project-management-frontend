import { motion as Motion } from "framer-motion";
import { Image } from "antd";
import { useSidebar } from "../../context/SidebarContext";
import SearchBar from "../ui/SearchBar";
import IMAGE from "../../assets/images/images";
import IconThemeToggle from "../icons/IconThemeToggle";
import IconMenu from "../icons/IconMenu";
import IconNotification from "../icons/IconNotification";
import { useState, useRef, useEffect } from "react";
import ProfileModal from "../modals/ProfileModal";
import NotificationDropdown from "../dropdown/NotificationDropdown";
import { useAuth } from "../../context/AuthContext";
import { useUserProfile } from "../../context/UserProfileContext";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { getProfileById, setProfileId } = useUserProfile();
  const { user } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const notifButtonRef = useRef(null);
  const notifDropdownRef = useRef(null);

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchProfile = async () => {
      try {
        const profileData = await getProfileById(user._id);
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target) &&
        notifButtonRef.current &&
        !notifButtonRef.current.contains(event.target)
      ) {
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
    setIsNotificationOpen(false);
    // Navigate to full notifications page
  };

  const unreadCount = 2;

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
            <Image width={50} src={IMAGE.LOGO} preview={false} alt="Logo" />
            <h1 className="text-[1.5em] font-semibold text-[var(--color-text-primary)]">
              PMS Team4.1
            </h1>
          </div>
        </div>

        {/* Right: Search, Theme, Notifications, Profile */}
        <div className="flex items-center justify-end gap-6 w-[50rem] relative">
          <div className="md:block hidden w-full">
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
            ref={notifButtonRef}
          >
            <IconNotification count={unreadCount} />
          </button>

          {isNotificationOpen && (
            <div
              ref={notifDropdownRef}
              className="absolute right-0 top-full mt-2 z-50"
            >
              <NotificationDropdown onViewAll={handleViewAllNotifications} />
            </div>
          )}

          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-[var(--color-action-hover)] p-2 rounded-lg transition-all duration-300"
            onClick={() => {
              setProfileId(user._id);
            }}
          >
            {!loadingProfile && profile ? (
              <>
                <div className="text-right flex-1">
                  <p className="text-[1rem] font-medium text-[var(--color-text-primary)] truncate">
                    {profile?.userId?.username || "Unknown"}
                  </p>
                  <p className="text-[0.7rem] text-[var(--color-text-secondary)] truncate">
                    {profile?.fullName}
                  </p>
                </div>
                <Image
                  width={40}
                  height={40}
                  src={profile?.avatarUrl}
                  preview={false}
                  alt="User avatar"
                  className="rounded-full object-cover border-2 border-[var(--color-border-light)] 
                             shadow-[var(--shadow-sm)]"
                />
              </>
            ) : (
              <div className="text-sm text-gray-400">Loading...</div>
            )}
          </div>
        </div>
      </div>
      <div className="sm:hidden flex justify-center mt-2">
        <SearchBar />
      </div>
      <ProfileModal />
    </Motion.div>
  );
};

export default Header;
