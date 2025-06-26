export type AttendanceSummary = {
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
};