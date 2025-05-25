import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "antd";
import IconSearch from "../icons/IconSearch";
import { motion as Motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const Wrapper = styled.div`
  .ant-input {
    border-color: transparent !important;
    box-shadow: none !important;
    background-color: transparent !important;
    outline: none !important;

    &:hover,
    &:focus,
    &:active {
      border-color: transparent !important;
      box-shadow: none !important;
      background-color: transparent !important;
      outline: none !important;
    }
  }
`;

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const { t } = useLanguage();

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
      <Wrapper className="searchbar w-full">
        <Input
          className="!bg-transparent !border-none !shadow-none !p-0 !text-[0.8rem] !text-[var(--color-text)] placeholder:!text-[var(--color-text)] placeholder:opacity-100"
          placeholder={t("searchPlaceholder")}
          value={value}
          allowClear
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onPressEnter={() => console.log("Search:", value)}
        />
      </Wrapper>
    </Motion.div>
  );
};

export default SearchBar;
