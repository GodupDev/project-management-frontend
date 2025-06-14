import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";
import IconHome from "../icons/IconHome";

// Tự động viết hoa chữ cái đầu mỗi từ
const toTitleCase = (str) =>
  decodeURIComponent(str || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

function Breadcrumb() {
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const customNames = location.state?.pathnames || [];

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
    ...pathSegments.map((seg, idx) => {
      const path = "/" + pathSegments.slice(0, idx + 1).join("/");
      const label = customNames[idx] || toTitleCase(seg);
      const isLast = idx === pathSegments.length - 1;

      return {
        title: isLast ? (
          <span className="text-[var(--color-text-secondary)] font-semibold text-base">
            {label}
          </span>
        ) : (
          <Link
            to={path}
            className="!text-[var(--color-text-secondary)] hover:text-blue-500 text-base transition-colors duration-200"
          >
            {label}
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
