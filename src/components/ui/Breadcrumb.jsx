import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

// Capitalize từng chữ đầu
const toTitleCase = (str) =>
  decodeURIComponent(str || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const items = [
    {
      title: (
        <Link to="/" className="text-gray-500 hover:text-blue-500">
          <HomeOutlined />
        </Link>
      ),
    },
    ...pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      const formattedName = toTitleCase(name);
      console.log(name);

      return {
        title: isLast ? (
          <span className="text-gray-900 font-medium">{formattedName}</span>
        ) : (
          <Link to={routeTo} className="text-gray-500 hover:text-blue-500">
            {formattedName}
          </Link>
        ),
      };
    }),
  ];

  return (
    <AntBreadcrumb
      items={items}
      className="mb-6"
      separator={<span className="text-gray-400">/</span>}
    />
  );
}

export default Breadcrumb;
