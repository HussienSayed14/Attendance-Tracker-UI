// src/pages/Home.tsx
// ShadCN/UI version — minimal, no custom components

import { useState, useEffect } from "react";
import { getSummary } from "../services/attendance";
import type { AttendanceSummary } from "../types/Attendance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function HomePage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-based
  const [data, setData] = useState<AttendanceSummary | null>(null);

  // Fetch summary whenever year/month changes
  useEffect(() => {
    (async () => {
      try {
        const res = await getSummary(year, month);
        setData(res);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [year, month]);

  return (
    <div className="p-6 space-y-6 max-w-screen-lg mx-auto">
      {/* Month / Year Picker */}
      <div className="flex flex-wrap gap-4">
        <div className="w-32">
          <Label>Year</Label>
          <Select value={String(year)} onValueChange={(v) => setYear(+v)}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {[2024, 2025, 2026].map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-40">
          <Label>Month</Label>
          <Select value={String(month)} onValueChange={(v) => setMonth(+v)}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m, idx) => (
                <SelectItem key={idx + 1} value={String(idx + 1)}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Card */}
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>
              {months[month - 1]} {year} Attendance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>📅 Total Working Days: {data.total_working_days}</div>
            <div>🎉 Holidays: {data.holidays}</div>
            <div>🏢 Req. On-site (Before): {data.required_on_site_before_exemptions}</div>
            <div>🔁 Req. On-site (After): {data.required_on_site_after_exemptions}</div>
            <div>🧑‍💼 On-site Days: {data.office_days}</div>
            <div>🖥 Remote Days: {data.remote_days}</div>
            <div>🌙 Night Days: {data.night_days}</div>
            <div>📄 Leave Days: {data.leave_days}</div>
            <div>❌ Absent Days: {data.absent_days}</div>
            <div>✅ Extra On-site Days: {data.extra_days}</div>
            <div>⏳ Remaining On-site: {data.remaining_on_site}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}