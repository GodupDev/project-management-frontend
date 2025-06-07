import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";
import IconHome from "../icons/IconHome";
import { useLanguage } from "../../context/LanguageContext";

// Map path segments to translation keys
const pathToTranslationKey = {
  projects: "navProjects",
  tasks: "navTasks",
  performance: "navPerformance",
  worklogs: "navWorklogs",
  settings: "navSettings",
  profile: "navProfile",
  notifications: "navNotifications",
  appearance: "navAppearance",
  privacy: "navPrivacy",
  timezone: "navTimezone",
  security: "navSecurity",
};

// Hàm viết hoa chữ cái đầu
const toTitleCase = (str) =>
  decodeURIComponent(str || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const { t } = useLanguage();

  const items = [
    {
      title: (
        <Link
          to="/"
          className="flex items-center transition-colors duration-200"
        >
          <IconHome className="w-5 h-5 mr-1 text-[var(--color-text-secondary)] hover:text-blue-500" />
        </Link>
      ),
    },
    ...pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;

      // Try to get translation key from mapping first
      let translatedName = pathToTranslationKey[name]
        ? t(pathToTranslationKey[name])
        : t(name.toLowerCase());

      // If no translation found, use formatted name
      if (translatedName === name.toLowerCase()) {
        translatedName = toTitleCase(name);
      }

      return {
        title: isLast ? (
          <span className="text-[var(--color-text-secondary)] font-semibold text-base">
            {translatedName}
          </span>
        ) : (
          <Link
            to={routeTo}
            className="!text-[var(--color-text-secondary)] hover:text-blue-500 text-base transition-colors duration-200"
          >
            {translatedName}
          </Link>
        ),
      };
    }),
  ];

  return (
    <AntBreadcrumb
      items={items}
      className="mb-6 text-base"
      separator={<span className="text-[var(--color-text-secondary)]">/</span>}
    />
  );
}

export default Breadcrumb;
