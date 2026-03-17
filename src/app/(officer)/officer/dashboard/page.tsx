"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { mockReports, dashboardMetrics, currentAgency, statusConfig } from "@/data/mock";
import { formatDate, formatWeekday } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Inbox,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Search,
  Eye,
} from "lucide-react";

export default function OfficerDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = useMemo(() => {
    return mockReports.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (typeFilter !== "all" && r.type.id !== typeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          r.trackingNumber.toLowerCase().includes(q) ||
          r.citizenName.toLowerCase().includes(q) ||
          r.citizenEmail.toLowerCase().includes(q) ||
          (r.data.description as string)?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [statusFilter, typeFilter, searchQuery]);

  const stats = [
    {
      label: "Pending Review",
      value: dashboardMetrics.pendingReview,
      icon: Inbox,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Approved Today",
      value: dashboardMetrics.approvedToday,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Rejected Today",
      value: dashboardMetrics.rejectedToday,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Avg Processing",
      value: dashboardMetrics.avgProcessingTime,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const reportTypeOptions = Array.from(new Set(mockReports.map((r) => r.type.id))).map((id) => {
    const rt = mockReports.find((r) => r.type.id === id)!.type;
    return { value: id, label: rt.name };
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Report Queue</h1>
          <p className="text-sm text-muted-foreground">
            {mockReports.length} total reports — {mockReports.filter((r) => r.status === "submitted").length} awaiting review
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Trend */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm">This Week&apos;s Report Volume</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-24">
            {dashboardMetrics.reportsTrend.map((day) => {
              const maxCount = Math.max(...dashboardMetrics.reportsTrend.map((d) => d.count));
              const height = (day.count / maxCount) * 100;
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium">{day.count}</span>
                  <div
                    className="w-full rounded-t-sm"
                    style={{
                      height: `${height}%`,
                      backgroundColor: currentAgency.primaryColor,
                      opacity: 0.7,
                    }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {formatWeekday(day.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.entries(statusConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {reportTypeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Report Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Tracking #</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No reports match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-mono text-xs font-medium">
                      {report.trackingNumber}
                    </TableCell>
                    <TableCell className="text-sm">{report.type.name}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{report.citizenName}</p>
                        <p className="text-xs text-muted-foreground">{report.citizenEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(report.submittedAt)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={report.status} />
                    </TableCell>
                    <TableCell className="text-sm">
                      {report.assignedOfficerName || (
                        <span className="text-muted-foreground italic">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <Link href={`/officer/reports/${report.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
