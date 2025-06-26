import axios from "./api";
import type { AttendanceSummary, 
    WorkDayWithStatus,
  SubmitAttendanceRequest, 
  AttendanceStatus
} from "@/types/Attendance";

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



const normalizeStatus = (status: string | null): AttendanceStatus | null => {
  if (status === "on-site") return "onsite";
  return status as AttendanceStatus;
};


/**
 * Fetch calendar range for current user.
 * @param start ISO date YYYY-MM-DD (inclusive)
 * @param end   ISO date YYYY-MM-DD (inclusive)
 */
export const getCalendar = async (
  start: string,
  end: string,
): Promise<WorkDayWithStatus[]> => {
  const res = await axios.get<WorkDayWithStatus[]>("/attendance/calendar", {
    params: { start, end },
  });

  return res.data.map((entry) => ({
    ...entry,
    status: normalizeStatus(entry.status),
  }));
};

/**
 * Bulk submit / update attendance entries.
 * Accepts the exact request body expected by the backend.
 */
export const submitAttendance = async (
  payload: SubmitAttendanceRequest,
): Promise<void> => {
  await axios.post("/attendance/submit", payload);
};