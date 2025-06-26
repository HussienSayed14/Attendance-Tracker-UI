// src/pages/AttendanceEditor.tsx – mobile-friendly with shadcn table

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  getCalendar,
  submitAttendance,
} from "@/services/attendance";
import type {
  AttendanceStatus,
  AttendanceEntry,
  WorkDayWithStatus,
} from "@/types/Attendance";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export const STATUS_LABELS: Record<AttendanceStatus, string> = {
  onsite: "on-site",
  remote: "remote",
  leave: "leave",
  night: "night",
  absent: "absent",
};

const STATUS_LIST = Object.keys(STATUS_LABELS) as AttendanceStatus[];

export default function AttendanceEditor() {
  const today = dayjs();
  const [start, setStart] = useState(today.startOf("month").format("YYYY-MM-DD"));
  const [end, setEnd] = useState(today.endOf("month").format("YYYY-MM-DD"));

  const [rows, setRows] = useState<WorkDayWithStatus[]>([]);
  const [edited, setEdited] = useState<Record<string, AttendanceStatus>>({});
  const [original, setOriginal] = useState<Record<string, AttendanceStatus | null>>({});
  const [loading, setLoading] = useState(false);

  const fetchRange = async () => {
    if (dayjs(end).isBefore(start)) return toast.error("End date must follow start date");
    setLoading(true);
    try {
      const data = await getCalendar(start, end);
      setRows(data);
      setOriginal(Object.fromEntries(data.map((d) => [d.date, d.status])));
      setEdited({});
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = (date: string, status: AttendanceStatus) => {
    setRows((prev) => prev.map((r) => (r.date === date ? { ...r, status } : r)));
    setEdited((prev) => {
      if (original[date] === status) {
        const { [date]: _omit, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: status };
    });
  };

  const handleSubmit = async () => {
    const entries: AttendanceEntry[] = Object.entries(edited).map(([date, status]) => ({ date, status }));
    if (!entries.length) return toast("No changes");

    try {
      await submitAttendance({ entries });
      toast.success("Saved");
      fetchRange();
    } catch {
      toast.error("Save failed");
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold">Edit Attendance</h2>

      {/* Range picker */}
      <div className="flex flex-wrap gap-4 items-end">
        {[
          { label: "Start date", value: start, set: setStart },
          { label: "End date", value: end, set: setEnd },
        ].map(({ label, value, set }) => (
          <div key={label} className="flex flex-col">
            <label className="text-sm font-medium mb-1">{label}</label>
            <input
              type="date"
              value={value}
              onChange={(e) => set(e.target.value)}
              className="border rounded-md px-2 py-1 dark:bg-gray-900"
            />
          </div>
        ))}
        <Button onClick={fetchRange} disabled={loading} className="h-9 px-6">
          {loading ? "Loading…" : "Load"}
        </Button>
      </div>

      {/* Unified responsive table */}
      <div className="overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Holiday</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.date}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.day_name}</TableCell>
                <TableCell>
                  {row.is_holiday ? <Badge variant="secondary">Holiday</Badge> : "-"}
                </TableCell>
                <TableCell>
                  {row.is_holiday ? (
                    <span className="text-muted-foreground text-sm">Locked</span>
                  ) : (
                    <Select
                      value={row.status ?? ""}
                      onValueChange={(val) => handleStatusChange(row.date, val as AttendanceStatus)}
                    >
                      <SelectTrigger className="w-40 h-9">
                        <SelectValue placeholder="Set status" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_LIST.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {STATUS_LABELS[opt]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button onClick={handleSubmit} className="w-full sm:w-auto">
        Submit Changes
      </Button>
    </div>
  );
}