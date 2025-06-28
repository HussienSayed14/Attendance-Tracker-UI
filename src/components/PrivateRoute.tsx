// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/authStore";
import SessionBootstrap from "@/lib/SessionBootstrap";

export default function PrivateRoute() {
  const token = authStore((s) => s.token);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <SessionBootstrap>
      <Outlet />
    </SessionBootstrap>
  );
}