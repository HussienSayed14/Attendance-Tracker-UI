import { Navigate, Outlet } from "react-router-dom";
import { authStore } from  "../store/authStore";

export default function PrivateRoute() {
  const token = authStore((s) => s.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}