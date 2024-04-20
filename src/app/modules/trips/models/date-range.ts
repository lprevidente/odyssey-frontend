import { format as formatDateFns } from "date-fns";

export interface DateRange {
  from: Date;
  to: Date;
}

export const format = (date: DateRange): { from: string; to: string } => {
  return {
    from: formatDateFns(date.from, "yyyy-MM-dd"),
    to: formatDateFns(date.to, "yyyy-MM-dd"),
  };
};
