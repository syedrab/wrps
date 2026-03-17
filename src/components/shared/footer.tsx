"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import { currentAgency } from "@/data/mock";
import { Lock, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer style={{ backgroundColor: currentAgency.primaryColor }} className="text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Agency Info */}
          <div className="md:col-span-1">
            <Image
              src={currentAgency.logo}
              alt={currentAgency.name}
              width={160}
              height={44}
              className="h-10 w-auto object-contain mb-4 brightness-200"
            />
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{currentAgency.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{currentAgency.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{currentAgency.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: currentAgency.secondaryColor }}>
              Quick Links
            </h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/report" className="text-sm text-white/70 hover:text-white transition-colors">
                {t("nav.report")}
              </Link>
              <Link href="/track" className="text-sm text-white/70 hover:text-white transition-colors">
                {t("nav.track")}
              </Link>
              <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                {t("nav.help")}
              </Link>
              <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: currentAgency.secondaryColor }}>
              Legal
            </h3>
            <div className="flex flex-col gap-2.5">
              <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                {t("nav.privacy")}
              </Link>
              <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                {t("nav.accessibility")}
              </Link>
              <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                {t("nav.terms")}
              </Link>
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: currentAgency.secondaryColor }}>
              Emergency
            </h3>
            <p className="text-sm text-white/70 mb-3">
              If you are in immediate danger or witnessing a crime in progress, call 911.
            </p>
            <div className="rounded-lg border border-red-500/30 bg-red-900/20 p-3 text-center">
              <p className="text-red-300 font-bold text-lg">9-1-1</p>
              <p className="text-xs text-red-300/70">Emergency Only</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {currentAgency.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Lock className="h-3 w-3" />
            <span>Encrypted &amp; Secure — MFIPPA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
