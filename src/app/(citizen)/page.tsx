"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { currentAgency } from "@/data/mock";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Search,
  Shield,
  Bell,
  ClipboardList,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Phone,
  PhoneCall,
  MonitorSmartphone,
} from "lucide-react";

export default function LandingPage() {
  const { t } = useLocale();

  const services = [
    { icon: FileText, title: t("landing.feature1.title"), desc: t("landing.feature1.desc") },
    { icon: Search, title: t("landing.feature2.title"), desc: t("landing.feature2.desc") },
    { icon: Shield, title: t("landing.feature3.title"), desc: t("landing.feature3.desc") },
    { icon: Bell, title: t("landing.feature4.title"), desc: t("landing.feature4.desc") },
  ];

  const steps = [
    { num: 1, icon: ClipboardList, title: t("landing.how.step1"), desc: t("landing.how.step1.desc") },
    { num: 2, icon: HelpCircle, title: t("landing.how.step2"), desc: t("landing.how.step2.desc") },
    { num: 3, icon: FileText, title: t("landing.how.step3"), desc: t("landing.how.step3.desc") },
    { num: 4, icon: CheckCircle, title: t("landing.how.step4"), desc: t("landing.how.step4.desc") },
  ];

  return (
    <>
      {/* Hero — white background with dark navy text */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center relative">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: currentAgency.primaryColor }}>
              {t("landing.title")}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("landing.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-base px-8 py-6 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: currentAgency.primaryColor, color: "white" }}
              >
                <Link href="/report">
                  {t("landing.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-lg font-semibold"
                style={{ borderColor: currentAgency.primaryColor, color: currentAgency.primaryColor }}
              >
                <Link href="/track">{t("landing.track_cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three action cards — matching WRPS style */}
      <section className="-mt-8 relative z-10 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Non-Emergency */}
            <a
              href={`tel:${currentAgency.phone}`}
              className="group flex flex-col items-center justify-center rounded-xl p-6 text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ backgroundColor: currentAgency.primaryColor }}
            >
              <Phone className="h-8 w-8 mb-3 text-white/80 group-hover:text-white transition-colors" />
              <span className="font-semibold text-sm">Non-Emergency</span>
              <span className="text-xs text-white/60 mt-1">{currentAgency.phone}</span>
            </a>

            {/* Report Online */}
            <Link
              href="/report"
              className="group flex flex-col items-center justify-center rounded-xl p-6 text-white bg-[#3a6ba5] transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <MonitorSmartphone className="h-8 w-8 mb-3 text-white/80 group-hover:text-white transition-colors" />
              <span className="font-semibold text-sm">Report Online</span>
              <span className="text-xs text-white/60 mt-1">File a report 24/7</span>
            </Link>

            {/* Emergency */}
            <a
              href="tel:911"
              className="group flex flex-col items-center justify-center rounded-xl p-6 text-white bg-[#8b2332] transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <PhoneCall className="h-8 w-8 mb-3 text-white/80 group-hover:text-white transition-colors" />
              <span className="font-semibold text-sm">Emergency</span>
              <span className="text-xs text-white/60 mt-1">Call 9-1-1</span>
            </a>
          </div>
        </div>
      </section>

      {/* Services — dark navy cards with gold outline icons */}
      <section className="py-16 md:py-20" style={{ backgroundColor: currentAgency.primaryColor }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">
            Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center rounded-xl p-5 border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 mb-3 transition-colors"
                  style={{ borderColor: currentAgency.secondaryColor }}
                >
                  <s.icon className="h-6 w-6" style={{ color: currentAgency.secondaryColor }} />
                </div>
                <h3 className="font-semibold text-sm text-white">{s.title}</h3>
                <p className="text-xs text-white/50 mt-1.5 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: currentAgency.primaryColor }}>
            {t("landing.how.title")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Filing a non-emergency report online is simple and takes just a few minutes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gray-200" />
                )}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full mx-auto mb-4 text-white font-bold text-lg"
                  style={{ backgroundColor: currentAgency.primaryColor }}
                >
                  {s.num}
                </div>
                <h3 className="font-semibold text-sm mb-1.5" style={{ color: currentAgency.primaryColor }}>
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: currentAgency.primaryColor }}>
              Ready to File a Report?
            </h2>
            <p className="text-muted-foreground mb-8">
              It only takes a few minutes to file a non-emergency report online. You&apos;ll receive a tracking number to follow your report&apos;s progress.
            </p>
            <Button
              asChild
              size="lg"
              className="text-base px-8 py-6 rounded-lg font-semibold"
              style={{ backgroundColor: currentAgency.primaryColor }}
            >
              <Link href="/report">
                {t("landing.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
