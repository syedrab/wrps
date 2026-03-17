"use client";

import { dashboardMetrics, currentAgency, statusConfig, mockReports } from "@/data/mock";
import { formatDate, formatShortDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  BarChart3,
  PieChart,
} from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState("7d");

  const stats = [
    {
      label: "Total Reports",
      value: dashboardMetrics.totalReports.toLocaleString(),
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Avg Processing Time",
      value: dashboardMetrics.avgProcessingTime,
      change: "-8%",
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Approval Rate",
      value: `${Math.round((dashboardMetrics.reportsByStatus.find((s) => s.status === "approved")!.count / dashboardMetrics.totalReports) * 100)}%`,
      change: "+2%",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Active Officers",
      value: "12",
      change: "",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">{currentAgency.name}</p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                {s.change && (
                  <span className={`text-xs font-medium ${s.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {s.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports by Type */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Reports by Type</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardMetrics.reportsByType.map((item) => {
                const maxCount = Math.max(...dashboardMetrics.reportsByType.map((d) => d.count));
                const percentage = (item.count / maxCount) * 100;
                return (
                  <div key={item.type}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="truncate">{item.type}</span>
                      <span className="font-medium ml-2">{item.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: currentAgency.primaryColor,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Reports by Status */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Reports by Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardMetrics.reportsByStatus.map((item) => {
                const config = statusConfig[item.status];
                const percentage = (item.count / dashboardMetrics.totalReports) * 100;
                return (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${config.color.replace("text-", "bg-")}`} />
                      <span className="text-sm">{config.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{item.count}</span>
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Daily Report Volume</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-40">
              {dashboardMetrics.reportsTrend.map((day) => {
                const maxCount = Math.max(...dashboardMetrics.reportsTrend.map((d) => d.count));
                const height = (day.count / maxCount) * 100;
                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-medium">{day.count}</span>
                    <div
                      className="w-full rounded-t-md min-h-[4px] transition-all duration-500"
                      style={{
                        height: `${height}%`,
                        backgroundColor: currentAgency.primaryColor,
                        opacity: 0.7,
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {formatShortDate(day.date)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockReports.slice(0, 5).map((report) => (
              <div key={report.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                    {report.citizenName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{report.trackingNumber}</p>
                    <p className="text-xs text-muted-foreground">{report.type.name} — {report.citizenName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[report.status].bgColor} ${statusConfig[report.status].color}`}>
                    {statusConfig[report.status].label}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(report.submittedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
