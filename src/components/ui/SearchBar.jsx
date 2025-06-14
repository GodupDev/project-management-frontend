import React, { useState, useEffect } from "react";
import { StyledInput } from "../styledAntd";
import IconSearch from "../icons/IconSearch";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useSearch } from "../../context/SearchContext";

const SearchBar = () => {
  const [localValue, setLocalValue] = useState("");
  const [focused, setFocused] = useState(false);
  const { t } = useLanguage();
  const { updateSearchTerm, clearSearch } = useSearch();

  // Debounce search term updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue.trim()) {
        updateSearchTerm(localValue.trim());
      } else {
        clearSearch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, updateSearchTerm, clearSearch]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && localValue.trim()) {
      updateSearchTerm(localValue.trim());
    }
  };

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
      <StyledInput
        placeholder={t("searchPlaceholder")}
        value={localValue}
        allowClear
        onChange={(e) => setLocalValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
      />
    </Motion.div>
  );
};

export default SearchBar;
