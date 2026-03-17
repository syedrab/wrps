import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Consistent date formatting to avoid hydration mismatches */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
}

export function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function formatWeekday(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-CA", { weekday: "short" });
}

export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}
