import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";

export const DEFAULT_FORMAT = "dd-MM-yyyy";

// Default format 31-12-2024 (dd-MM-yyyy)
export const getDateFormat = (date: Date | string, formatStr?: string) => {
  return format(date, formatStr || DEFAULT_FORMAT);
};

export const getChatListTimeFormat = (date: Date) => {
  if (isToday(date)) {
    return format(date, "HH:mm");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  if (isThisWeek(date)) {
    return format(date, "EEE");
  }

  if (isThisYear(date)) {
    return format(date, "dd/MM");
  }

  return format(date, "dd/MM/yyyy");
};
