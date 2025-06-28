import api from "@/services/api";

export interface BackUser {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  permissions: string[];
}

/* fetch all | active | inactive */
export const fetchUsers = async (status: "all" | "active" | "inactive") => {
  const res = await api.get<BackUser[]>(`/admin/users`, { params: { status } });
  return res.data;
};

/* toggle active / inactive */
export const changeUserStatus = async (id: number, is_active: boolean) => {
  const payload = {
    id: id,
    is_active: is_active

  }

  await api.patch(`/admin/users/update`,payload);
};