import React from "react";
import Sidebar from "../../../components/admin/sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div
      className="d-flex gap-3"
      style={{
        paddingTop: "85px", // أضفنا مسافة علوية كافية لكي لا يختفي النص خلف الناف بار
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
