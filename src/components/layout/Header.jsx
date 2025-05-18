import { motion } from "framer-motion";
import { Image } from "antd";

import SearchBar from "../ui/SearchBar";
import IMAGE from "../../assets/images/images";
import IconNotification from "../icons/IconNotification";

const Header = () => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white px-6 py-3 shadow-md"
    >
      <div className="flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          <Image
            width={35}
            src={IMAGE.LOGO}
            preview={false}
            className="rounded-md"
          />
          <h1 className="text-lg font-semibold text-gray-800">PMS Team4</h1>
        </div>

        {/* Right Content: Search, Notification, Profile */}
        <div className="flex items-center gap-6 sm:w-[20rem] lg:w-[30rem]">
          <SearchBar />

          <IconNotification />
          <div className="flex items-center gap-3">
            <div className="text-right flex-1">
              <p className="text-[0.7rem] font-medium text-black truncate">
                Full Name
              </p>
              <p className="text-[0.65rem] text-gray-500 truncate">Address</p>
            </div>
            <Image
              width={40}
              height={40}
              src="https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
              preview={false}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
