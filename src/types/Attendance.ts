// src/types/attendance.ts
// ────────────────────────────────────────────────────────────────────────────────
// Centralised attendance-related TS interfaces

/** Summary from GET /attendance/summary/{year}/{month} */
export interface AttendanceSummary {
  year: number;
  month: number;

  total_working_days: number;
  holidays: number;

  required_on_site_before_exemptions: number;
  required_on_site_after_exemptions: number;

  office_days: number;
  remote_days: number;
  leave_days: number;
  night_days: number;
  absent_days: number;
  remaining_on_site: number;
  extra_days: number;
}

/** Item returned by GET /attendance/calendar?start=YYYY-MM-DD&end=YYYY-MM-DD */
export interface WorkDayWithStatus {
  date: string;          // ISO date, e.g. "2025-07-01"
  is_holiday: boolean;
  day_name: string;   // e.g. "Monday"
  status: AttendanceStatus | null;
}

export type AttendanceStatus = |"onsite" | "remote" | "leave" | "night" | "absent";

/** Entry used to submit or update attendance */
export interface AttendanceEntry {
  date: string;          // ISO date
  status: AttendanceStatus;
}

/** Body for POST /attendance/submit (bulk upsert) */
export interface SubmitAttendanceRequest {
  entries: AttendanceEntry[];
}