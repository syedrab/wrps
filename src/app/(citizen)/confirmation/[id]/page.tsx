"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale } from "@/lib/locale-context";
import { currentAgency } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Copy, FileText, Search } from "lucide-react";
import { useState } from "react";

export default function ConfirmationPage() {
  const params = useParams();
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);
  const trackingNumber = decodeURIComponent(params.id as string);

  function handleCopy() {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-2xl">
      <div className="text-center mb-8">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full mx-auto mb-6"
          style={{ backgroundColor: `${currentAgency.primaryColor}10` }}
        >
          <CheckCircle2 className="h-10 w-10" style={{ color: currentAgency.primaryColor }} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("confirmation.title")}</h1>
        <p className="text-muted-foreground">{t("confirmation.desc")}</p>
      </div>

      {/* Tracking Number */}
      <Card className="mb-8">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">{t("confirmation.tracking")}</p>
          <div className="flex items-center justify-center gap-3">
            <code className="text-2xl md:text-3xl font-bold tracking-wider" style={{ color: currentAgency.primaryColor }}>
              {trackingNumber}
            </code>
            <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy tracking number">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && <p className="text-xs text-green-600 mt-2">Copied to clipboard!</p>}
          <p className="text-sm text-muted-foreground mt-4">
            {t("confirmation.email_sent")} <strong>your email</strong>
          </p>
        </CardContent>
      </Card>

      {/* What happens next */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="font-semibold mb-4">{t("confirmation.what_next")}</h2>
          <div className="space-y-3">
            {[t("confirmation.next1"), t("confirmation.next2"), t("confirmation.next3")].map(
              (step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: currentAgency.primaryColor }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild style={{ backgroundColor: currentAgency.primaryColor }}>
          <Link href={`/track/${encodeURIComponent(trackingNumber)}`}>
            <Search className="mr-2 h-4 w-4" />
            {t("confirmation.track_btn")}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/report">
            <FileText className="mr-2 h-4 w-4" />
            {t("confirmation.new_btn")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
