"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { formatDate, formatDateTime } from "@/lib/utils";
import { mockReports, currentAgency, statusConfig } from "@/data/mock";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Image as ImageIcon,
  Film,
} from "lucide-react";

const statusIcons: Record<string, React.ElementType> = {
  submitted: Clock,
  under_review: HelpCircle,
  approved: CheckCircle2,
  rejected: XCircle,
  info_requested: AlertCircle,
  closed: CheckCircle2,
};

export default function TrackDetailPage() {
  const params = useParams();
  const { locale, t } = useLocale();
  const trackingNumber = decodeURIComponent(params.id as string);

  const report = mockReports.find(
    (r) => r.trackingNumber.toLowerCase() === trackingNumber.toLowerCase()
  );

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-xl text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full mx-auto mb-4 bg-gray-100">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-semibold mb-2">Report Not Found</h1>
        <p className="text-muted-foreground mb-6">
          No report found with tracking number <strong>{trackingNumber}</strong>. Please check the number and try again.
        </p>
        <Button asChild variant="outline">
          <Link href="/track">
            <ArrowLeft className="mr-2 h-4 w-4" /> Try Again
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href="/track">
          <ArrowLeft className="mr-2 h-4 w-4" /> {t("report.back")}
        </Link>
      </Button>

      {/* Status Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
              <p className="text-lg font-bold" style={{ color: currentAgency.primaryColor }}>
                {report.trackingNumber}
              </p>
            </div>
            <StatusBadge status={report.status} />
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">{t("track.submitted_at")}</p>
              <p className="font-medium">{formatDate(report.submittedAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">{t("track.updated_at")}</p>
              <p className="font-medium">{formatDate(report.updatedAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Report Type</p>
              <p className="font-medium">
                {locale === "fr" ? report.type.nameFr : report.type.name}
              </p>
            </div>
            {report.occurrenceNumber && (
              <div>
                <p className="text-muted-foreground">{t("track.occurrence")}</p>
                <p className="font-medium">{report.occurrenceNumber}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">{t("track.timeline")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {report.statusHistory.map((entry, i) => {
              const Icon = statusIcons[entry.status] || Clock;
              const config = statusConfig[entry.status];
              const isLast = i === report.statusHistory.length - 1;
              return (
                <div key={i} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        isLast ? config.bgColor : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isLast ? config.color : "text-gray-400"}`} />
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                  </div>
                  <div className="pb-2">
                    <p className={`text-sm font-medium ${isLast ? "" : "text-muted-foreground"}`}>
                      {locale === "fr" ? statusConfig[entry.status].labelFr : statusConfig[entry.status].label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDateTime(entry.changedAt)} — {entry.changedBy}
                    </p>
                    {entry.reason && (
                      <p className="text-sm mt-1 text-muted-foreground">{entry.reason}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Evidence */}
      {report.evidenceFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Evidence Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {report.evidenceFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 rounded-lg border p-3">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  ) : file.type.startsWith("video/") ? (
                    <Film className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(1)} MB — Uploaded{" "}
                      {formatDate(file.uploadedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
