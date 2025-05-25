import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";
import IconHome from "../icons/IconHome";

// Hàm viết hoa chữ cái đầu
const toTitleCase = (str) =>
  decodeURIComponent(str || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const items = [
    {
      title: (
        <Link
          to="/"
          className="flex items-center text-gray-500  transition-colors duration-200"
        >
          <IconHome className="w-5 h-5 mr-1 hover:text-blue-500" />
        </Link>
      ),
    },
    ...pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      const formattedName = toTitleCase(name);

      return {
        title: isLast ? (
          <span className="text-gray-900 font-semibold text-base">
            {formattedName}
          </span>
        ) : (
          <Link
            to={routeTo}
            className="text-gray-500 hover:text-blue-500 text-base transition-colors duration-200"
          >
            {formattedName}
          </Link>
        ),
      };
    }),
  ];

  return (
    <AntBreadcrumb
      items={items}
      className="mb-6 text-base"
      separator={<span className="text-gray-400">/</span>}
    />
  );
}

export default Breadcrumb;
