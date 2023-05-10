import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./notPermitted";
import Loader from "@/components/Loader";

// Check Role
const RoleBaseRoute = ({ children }) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const { data, isLoading } = useSelector((state) => state.auth);
  const userRole = data?.role;
  if (isAdminRoute && userRole === "ADMIN") {
    return <>{children}</>;
  } else {
    return <NotPermitted />;
  }
};
const AdminGuards = ({ children }) => {
  const isAuthenticated = false;
  return (
    <>
      {!isAuthenticated ? (
        <RoleBaseRoute>{children}</RoleBaseRoute>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default AdminGuards;
