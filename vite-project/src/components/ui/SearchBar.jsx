import React, { useState } from "react";
import { Input } from "antd";
import IconSearch from "../icons/IconSearch";
import { motion } from "framer-motion";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`w-full h-8 flex items-center gap-3 px-3 rounded-sm border transition-all
    ${
      focused
        ? "border-[#9A93B3]/10 ring ring-[#9A93B3]/30"
        : "border-[#9A93B3]/50 hover:ring-[#9A93B3]/30"
    }
  `}
    >
      <IconSearch />

      <Input
        className="!bg-transparent !border-none !shadow-none !text-[#787486] !placeholder-[#787486/10] !p-0 !text-[0.65rem]"
        placeholder="Search for anything..."
        value={value}
        allowClear
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onPressEnter={() => console.log("Search:", value)}
      />
    </motion.div>
  );
};

export default SearchBar;
