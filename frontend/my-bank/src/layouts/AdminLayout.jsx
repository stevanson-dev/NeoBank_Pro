import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <Outlet />
      </main>

    </div>
  );
}