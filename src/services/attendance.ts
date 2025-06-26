import axios from "./api";
import type { AttendanceSummary } from "@/types/Attendance";

/**
 * Fetch a month’s attendance summary for the logged-in user.
 * @param year  full year (e.g. 2025)
 * @param month 1-based month (1 = Jan … 12 = Dec)
 */
export const getSummary = async (
  year: number,
  month: number
): Promise<AttendanceSummary> => {
  const res = await axios.get<AttendanceSummary>(
    `/attendance/summary/${year}/${month}`
  );
  return res.data;
};