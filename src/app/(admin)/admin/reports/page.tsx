"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { mockReports, statusConfig } from "@/data/mock";
import { formatDate, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Eye,
  FileText,
  Image as ImageIcon,
  Film,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Paperclip,
} from "lucide-react";
import { Report } from "@/types";

export default function AdminReportsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

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

  const reportTypeOptions = Array.from(new Set(mockReports.map((r) => r.type.id))).map((id) => {
    const rt = mockReports.find((r) => r.type.id === id)!.type;
    return { value: id, label: rt.name };
  });

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of mockReports) {
      counts[r.status] = (counts[r.status] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold">All Reports</h1>
        <p className="text-sm text-muted-foreground">
          View and inspect all submitted reports across your agency.
        </p>
      </div>

      {/* Status summary pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            statusFilter === "all" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
          }`}
        >
          All ({mockReports.length})
        </button>
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = statusCounts[key] || 0;
          if (count === 0) return null;
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(statusFilter === key ? "all" : key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                statusFilter === key
                  ? `${config.bgColor} ${config.color}`
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by tracking #, name, email, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
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
                <TableHead>Evidence</TableHead>
                <TableHead className="w-[80px]">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No reports match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-gray-50/50 cursor-pointer" onClick={() => setSelectedReport(report)}>
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
                        <span className="text-muted-foreground italic">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {report.evidenceFiles.length > 0 ? (
                        <Badge variant="outline" className="text-xs">
                          <Paperclip className="h-3 w-3 mr-1" />
                          {report.evidenceFiles.length}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setSelectedReport(report); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Report Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <DialogTitle className="font-mono">{selectedReport.trackingNumber}</DialogTitle>
                  <StatusBadge status={selectedReport.status} />
                </div>
                <p className="text-sm text-muted-foreground">{selectedReport.type.name}</p>
              </DialogHeader>

              <div className="space-y-5 pt-2">
                {/* Reporter Info */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Reporter</h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      {selectedReport.citizenName}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      {selectedReport.citizenEmail}
                    </div>
                    {selectedReport.citizenPhone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        {selectedReport.citizenPhone}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      Submitted {formatDateTime(selectedReport.submittedAt)}
                    </div>
                    {selectedReport.data.location && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        {String(selectedReport.data.location)}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Report Details */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Report Details</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedReport.data).map(([key, value]) => {
                      const field = selectedReport.type.fields.find((f) => f.id === key);
                      if (!field || !value) return null;
                      return (
                        <div key={key}>
                          <p className="text-xs font-medium text-muted-foreground">{field.label}</p>
                          <p className="text-sm mt-0.5 whitespace-pre-wrap">{String(value)}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Evidence */}
                {selectedReport.evidenceFiles.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Evidence ({selectedReport.evidenceFiles.length} files)
                      </h3>
                      <div className="space-y-2">
                        {selectedReport.evidenceFiles.map((file) => (
                          <div key={file.id} className="flex items-center gap-3 rounded-lg border p-2.5">
                            {file.type.startsWith("image/") ? (
                              <ImageIcon className="h-4 w-4 text-blue-600" />
                            ) : file.type.startsWith("video/") ? (
                              <Film className="h-4 w-4 text-purple-600" />
                            ) : (
                              <FileText className="h-4 w-4 text-gray-600" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(1)} MB — {formatDate(file.uploadedAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Status Timeline */}
                <Separator />
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Status History</h3>
                  <div className="space-y-2">
                    {selectedReport.statusHistory.map((entry, i) => {
                      const config = statusConfig[entry.status];
                      return (
                        <div key={i} className="flex gap-3">
                          <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${config.color.replace("text-", "bg-")}`} />
                          <div>
                            <p className="text-sm font-medium">{config.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDateTime(entry.changedAt)} — {entry.changedBy}
                            </p>
                            {entry.reason && (
                              <p className="text-xs text-muted-foreground mt-0.5">{entry.reason}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Internal Notes */}
                {selectedReport.notes.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Internal Notes ({selectedReport.notes.length})
                      </h3>
                      <div className="space-y-2">
                        {selectedReport.notes.map((note) => (
                          <div key={note.id} className="rounded-lg bg-gray-50 p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-medium">{note.authorName}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</p>
                            </div>
                            <p className="text-sm">{note.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Occurrence Number */}
                {selectedReport.occurrenceNumber && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 p-3">
                      <Shield className="h-4 w-4 text-green-700" />
                      <div>
                        <p className="text-xs text-green-700 font-medium">RMS Occurrence Number</p>
                        <p className="text-sm font-bold text-green-800">{selectedReport.occurrenceNumber}</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Link to officer view */}
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/officer/reports/${selectedReport.id}`}>
                      Open in Officer Portal
                      <Eye className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
