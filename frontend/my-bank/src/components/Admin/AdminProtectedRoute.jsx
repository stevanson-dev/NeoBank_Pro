import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const isAdminAuthenticated =
    localStorage.getItem("adminAuthenticated") === "true";

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}