"use client";

import { ReportStatus } from "@/types";
import { statusConfig } from "@/data/mock";
import { useLocale } from "@/lib/locale-context";

export function StatusBadge({ status }: { status: ReportStatus }) {
  const { locale } = useLocale();
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.color}`}
    >
      {locale === "fr" ? config.labelFr : config.label}
    </span>
  );
}
