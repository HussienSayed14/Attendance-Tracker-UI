import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetchUsers, changeUserStatus } from "@/services/user";
import type { BackUser } from "@/services/user";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import PermissionGuard from "@/guards/PermissionGuard";

export default function UserManagement() {
  const [users, setUsers] = useState<BackUser[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers(filter);
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const toggle = async (u: BackUser) => {
    try {
      await changeUserStatus(u.id, !u.is_active);
      toast.success(`User ${u.name} ${u.is_active ? "deactivated" : "activated"}`);
      setUsers((prev) =>
        prev.map((p) => (p.id === u.id ? { ...p, is_active: !u.is_active } : p))
      );
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <PermissionGuard permission="can_manage_access">
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">User Management</h1>

        {/* filter select */}
        <div className="flex gap-4 items-center">
          <span>Status:</span>
          <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={load} disabled={loading}>
            {loading ? "Loading…" : "Refresh"}
          </Button>
        </div>

        {/* table */}
        <div className="border rounded-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Created</th>
                <th className="p-2 text-left">Active</th>
                <th className="p-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t last:border-b">
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{dayjs(u.created_at).format("YYYY-MM-DD")}</td>
                  <td className="p-2">{u.is_active ? "Yes" : "No"}</td>
                  <td className="p-2">
                    <Button
                      size="sm"
                      variant={u.is_active ? "destructive" : "default"}
                      onClick={() => toggle(u)}
                    >
                      {u.is_active ? "Deactivate" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PermissionGuard>
  );
}