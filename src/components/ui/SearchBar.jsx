import React, { useState } from "react";
import { Input } from "antd";
import IconSearch from "../icons/IconSearch";
import { motion as Motion } from "framer-motion";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <Motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`w-full h-10 flex items-center gap-3 px-3 rounded-sm border transition-all bg-[var(--color-bg-secondary)]
        ${
          focused
            ? "border-[var(--color-primary-light)] ring ring-[var(--color-primary-light)] font-medium"
            : "border-[var(--color-border-main)] hover:border-[var(--color-primary-light)]"
        }
      `}
    >
      <IconSearch />
      <div className="searchbar w-full">
        <Input
          className="!bg-transparent !border-none !shadow-none !p-0 !text-[0.8rem] !text-[var(--color-text)] placeholder:!text-[var(--color-text)] placeholder:opacity-100"
          placeholder="Search for anything..."
          value={value}
          allowClear
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onPressEnter={() => console.log("Search:", value)}
        />
      </div>
    </Motion.div>
  );
};

export default SearchBar;
