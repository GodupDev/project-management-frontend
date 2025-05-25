import React from "react";
import { Outlet } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import Breadcrumb from "../ui/Breadcrumb";
import Sidebar from "./SideBar";
import Header from "./Header";

function LayoutWithBreadcrumb() {
  const { isOpen } = useSidebar();
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div>
        <Header />
        <div
          className={`flex-1 transition-all duration-300 ml-[7rem] mt-[7rem] mr-[1rem] ${
            isOpen ? "ml-[22rem]" : ""
          }`}
        >
          <Breadcrumb />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default LayoutWithBreadcrumb;
