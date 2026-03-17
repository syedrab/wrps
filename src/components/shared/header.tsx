"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import { currentAgency } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe, Phone } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/report", label: t("nav.report") },
    { href: "/track", label: t("nav.track") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar — matches WRPS site */}
      <div className="bg-[#f5f5f5] border-b text-xs">
        <div className="container mx-auto flex items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-4 text-gray-600">
            <span className="font-semibold text-red-700">Emergency: 9-1-1</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone className="h-3 w-3" />
              Non Emergency: {currentAgency.phone}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocale(locale === "en" ? "fr" : "en")}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium"
              aria-label={`Switch to ${locale === "en" ? "French" : "English"}`}
            >
              <Globe className="h-3 w-3" />
              {t("nav.language")}
            </button>
            <Link
              href="/report"
              className="hidden sm:inline-flex items-center px-3 py-1 rounded text-xs font-semibold text-white transition-colors"
              style={{ backgroundColor: currentAgency.secondaryColor, color: currentAgency.primaryColor }}
            >
              Online Reporting
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav bar — dark navy like WRPS */}
      <div style={{ backgroundColor: currentAgency.primaryColor }}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={`${currentAgency.name} - Home`}>
            <Image
              src={currentAgency.logo}
              alt={`${currentAgency.name} logo`}
              width={180}
              height={48}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/80 rounded-md hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-1 mt-8" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
