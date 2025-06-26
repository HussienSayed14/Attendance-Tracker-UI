// src/layouts/ProtectedLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";


export default function ProtectedLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 1)  Top navigation bar */}
      <Navbar />

      {/* 2)  Page content (renders Summary, Calendar, etc.) */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* 3)  Bottom footer nav (optional quick links) */}
      <footer className="py-4 text-center text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Attendance Tracker
      </footer>
    </div>
  );
}