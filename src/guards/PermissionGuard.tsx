import { Navigate } from "react-router-dom";
import { authStore } from "@/store/authStore";
import type { ReactNode } from "react";

interface Props {
  permission: string;
  children: ReactNode;
}

export default function PermissionGuard({ permission, children }: Props) {
  const { permissions, loading } = authStore();

  if (loading) return null;                    // still fetching /me
  if (!permissions?.includes(permission)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
}