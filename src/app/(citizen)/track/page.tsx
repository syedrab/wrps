"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale-context";
import { currentAgency } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Shield } from "lucide-react";

export default function TrackPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (trackingNumber.trim()) {
      router.push(`/track/${encodeURIComponent(trackingNumber.trim())}`);
    }
  }

  return (
    <div>
      {/* Navy header */}
      <div style={{ backgroundColor: currentAgency.primaryColor }} className="py-8 md:py-10">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{t("track.title")}</h1>
          <p className="text-white/60">{t("track.desc")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-10 max-w-xl">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder={t("track.placeholder")}
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="text-center text-lg h-12"
                  aria-label="Tracking number"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11"
                style={{ backgroundColor: currentAgency.primaryColor }}
                disabled={!trackingNumber.trim()}
              >
                <Search className="mr-2 h-4 w-4" />
                {t("track.button")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 rounded-xl border p-5 bg-white">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 shrink-0 mt-0.5" style={{ color: currentAgency.secondaryColor }} />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Your privacy is protected</p>
              <p>
                Only the tracking number is needed to view your report status. No personal information is required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
