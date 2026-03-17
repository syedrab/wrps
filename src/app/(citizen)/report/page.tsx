"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { reportTypes, currentAgency } from "@/data/mock";
import {
  ShoppingBag,
  Hammer,
  Store,
  AlertTriangle,
  Search,
  Car,
  ArrowRight,
  FileText,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Hammer,
  Store,
  AlertTriangle,
  Search,
  Car,
};

export default function ReportTypePage() {
  const { locale, t } = useLocale();

  return (
    <div>
      {/* Page header — dark navy */}
      <div style={{ backgroundColor: currentAgency.primaryColor }} className="py-8 md:py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t("report.select_type")}
          </h1>
          <p className="text-white/60">
            {t("report.select_type_desc")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-10 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reportTypes
            .filter((rt) => rt.enabled)
            .map((rt) => {
              const Icon = iconMap[rt.icon] || FileText;
              return (
                <Link key={rt.id} href={`/report/${rt.id}`}>
                  <div className="group h-full rounded-xl border border-gray-200 bg-white p-5 flex items-start gap-4 transition-all hover:shadow-md hover:border-gray-300 cursor-pointer">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
                      style={{ borderColor: currentAgency.secondaryColor }}
                    >
                      <Icon className="h-5 w-5" style={{ color: currentAgency.secondaryColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="font-semibold text-base" style={{ color: currentAgency.primaryColor }}>
                          {locale === "fr" ? rt.nameFr : rt.name}
                        </h2>
                        <ArrowRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: currentAgency.secondaryColor }} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {locale === "fr" ? rt.descriptionFr : rt.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
