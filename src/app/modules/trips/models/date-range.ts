import { format } from "date-fns";

export interface DateRange {
  from: Date;
  to: Date;
}

export const formatDateRange = (
  date: DateRange
): { from: string; to: string } => {
  return {
    from: format(date.from, "yyyy-MM-dd"),
    to: format(date.to, "yyyy-MM-dd"),
  };
};
