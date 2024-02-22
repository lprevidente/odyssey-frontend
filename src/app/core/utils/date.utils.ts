import { parse, parseISO } from "date-fns";
import { map } from "rxjs";

const isoDateFormat = /^\d{4}-\d{2}-\d{2}$/; // yyyy-MM-dd
const timeFormat = /^\d{2}:\d{2}:\d{2}$/; // HH:mm:ss
const isDateTimeFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/; // yyyy-MM-ddTHH:mm:ssZ

/**
 * Automatically transforms all dates in json in defined regex format to Date entity
 */
export function TransformDate(
  target: unknown,
  key: string,
  descriptor: any
): any {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: unknown[]): unknown {
    return originalMethod
      .apply(this, args)
      .pipe(map(obj => convertDatesInObject(obj)));
  };
  return descriptor;
}

const isDateTime = (s: string): boolean => isDateTimeFormat.test(s);
const isDate = (s: string): boolean => isoDateFormat.test(s);
const isTime = (s: string): boolean => timeFormat.test(s);

function convertDatesInObject(obj: any): unknown {
  if (obj === null || obj === undefined) return obj;

  if (isDateTime(obj)) return parseISO(obj);
  if (isDate(obj)) return parseDate(obj);
  if (isTime(obj)) return parseTime(obj);

  if (obj instanceof Array) return obj.map(n => convertDatesInObject(n));

  if (typeof obj === "object") {
    Object.keys(obj).forEach(k => (obj[k] = convertDatesInObject(obj[k])));
    return obj;
  }
  return obj;
}

export function parseDate(date: string): Date {
  return parse(date, "yyyy-MM-dd", new Date());
}

export function parseTime(time: string): Date {
  return parse(time, "HH:mm:ss", new Date());
}
