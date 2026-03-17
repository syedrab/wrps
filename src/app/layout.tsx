import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/locale-context";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Online Police Reporting — WRPS / ESCO",
  description:
    "File non-emergency police reports 24/7. Waterloo Regional Police Service — Emergency Services Cooperative Ontario.",
  keywords: ["police report", "non-emergency", "WRPS", "ESCO", "online reporting"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <LocaleProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
