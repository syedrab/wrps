"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { currentAgency, officers } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  FileText,
  Menu,
  Bell,
} from "lucide-react";
import { useState } from "react";

const currentOfficer = officers[0];

const sidebarLinks = [
  { href: "/officer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/officer/dashboard", label: "Report Queue", icon: FileText },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: currentAgency.primaryColor }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <Image
          src={currentAgency.logo}
          alt={currentAgency.shortName}
          width={120}
          height={36}
          className="h-8 w-auto object-contain brightness-200"
        />
      </div>

      {/* Label */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: currentAgency.secondaryColor }}>
          Officer Portal
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-1 space-y-0.5" aria-label="Officer navigation">
        {sidebarLinks.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs font-bold" style={{ backgroundColor: currentAgency.secondaryColor, color: currentAgency.primaryColor }}>
              {currentOfficer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentOfficer.name}</p>
            <p className="text-xs text-white/50">{currentOfficer.badgeNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className="hidden lg:flex w-64 flex-col shrink-0">
        <SidebarContent pathname={pathname} />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b bg-white px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent pathname={pathname} />
              </SheetContent>
            </Sheet>
            <h1 className="text-sm font-semibold lg:hidden" style={{ color: currentAgency.primaryColor }}>
              Officer Portal
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
