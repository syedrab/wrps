"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mockReports, statusConfig, officers } from "@/data/mock";
import { formatDate, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Send,
  Video,
  FileText,
  Image as ImageIcon,
  Film,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ArrowRightLeft,
} from "lucide-react";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const report = mockReports.find((r) => r.id === params.id);
  const [newNote, setNewNote] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [infoRequest, setInfoRequest] = useState("");

  if (!report) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold mb-2">Report not found</h1>
        <Button variant="outline" onClick={() => router.push("/officer/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/officer/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold">{report.trackingNumber}</h1>
              <StatusBadge status={report.status} />
            </div>
            <p className="text-sm text-muted-foreground">{report.type.name}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {/* Approve */}
          <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="mr-1.5 h-4 w-4" /> Approve
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve Report</DialogTitle>
                <DialogDescription>
                  This will generate an occurrence number and push the report to the RMS. The citizen will be notified.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm mb-2">
                  <strong>Report:</strong> {report.trackingNumber}
                </p>
                <p className="text-sm">
                  <strong>Generated Occurrence #:</strong> WR-2026-{Math.floor(14500 + Math.random() * 500)}
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setShowApproveDialog(false);
                    router.push("/officer/dashboard");
                  }}
                >
                  Confirm Approval
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Reject */}
          <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <XCircle className="mr-1.5 h-4 w-4" /> Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Report</DialogTitle>
                <DialogDescription>
                  Provide a reason for rejection. The citizen will be notified with this reason.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => {
                  setShowRejectDialog(false);
                  router.push("/officer/dashboard");
                }}>
                  Confirm Rejection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Request Info */}
          <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <MessageSquare className="mr-1.5 h-4 w-4" /> Request Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Additional Information</DialogTitle>
                <DialogDescription>
                  Describe what information you need from the citizen. They will receive an email.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Please provide..."
                value={infoRequest}
                onChange={(e) => setInfoRequest(e.target.value)}
                rows={4}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInfoDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setShowInfoDialog(false);
                }}>
                  Send Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Transfer */}
          <Button size="sm" variant="outline">
            <ArrowRightLeft className="mr-1.5 h-4 w-4" /> Transfer
          </Button>

          {/* Video Call */}
          <Button size="sm" variant="outline" asChild>
            <Link href={`/officer/video-call/${report.id}`}>
              <Video className="mr-1.5 h-4 w-4" /> Video Call
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Report Details</TabsTrigger>
              <TabsTrigger value="evidence">Evidence ({report.evidenceFiles.length})</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <Card>
                <CardContent className="p-5 space-y-4">
                  {Object.entries(report.data).map(([key, value]) => {
                    const field = report.type.fields.find((f) => f.id === key);
                    if (!field || !value) return null;
                    return (
                      <div key={key}>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {field.label}
                        </p>
                        <p className="text-sm mt-0.5 whitespace-pre-wrap">{String(value)}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evidence" className="mt-4">
              <Card>
                <CardContent className="p-5">
                  {report.evidenceFiles.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No evidence files attached to this report.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {report.evidenceFiles.map((file) => (
                        <div key={file.id} className="rounded-lg border p-4">
                          <div className="flex items-center gap-3 mb-2">
                            {file.type.startsWith("image/") ? (
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                <ImageIcon className="h-5 w-5 text-blue-600" />
                              </div>
                            ) : file.type.startsWith("video/") ? (
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                                <Film className="h-5 w-5 text-purple-600" />
                              </div>
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
                                <FileText className="h-5 w-5 text-gray-600" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Uploaded {formatDateTime(file.uploadedAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audit" className="mt-4">
              <Card>
                <CardContent className="p-5">
                  <div className="space-y-4">
                    {report.auditLog.map((entry) => (
                      <div key={entry.id} className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{entry.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {entry.userName} — {formatDateTime(entry.timestamp)}
                          </p>
                          <p className="text-xs text-muted-foreground">{entry.details}</p>
                          <p className="text-xs text-muted-foreground">IP: {entry.ipAddress}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Reporter Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Reporter Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                {report.citizenName}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {report.citizenEmail}
              </div>
              {report.citizenPhone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {report.citizenPhone}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Submitted {formatDateTime(report.submittedAt)}
              </div>
              {report.data.location && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  {String(report.data.location)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assignment */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue={report.assignedOfficerId || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to officer..." />
                </SelectTrigger>
                <SelectContent>
                  {officers.filter((o) => o.role === "reviewer").map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.name} ({o.badgeNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Internal Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Internal Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {report.notes.map((note) => (
                <div key={note.id} className="rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium">{note.authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </div>
              ))}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={2}
                  className="text-sm"
                />
              </div>
              <Button size="sm" className="w-full" disabled={!newNote.trim()}>
                <Send className="mr-1.5 h-3 w-3" /> Add Note
              </Button>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.statusHistory.map((entry, i) => {
                  const config = statusConfig[entry.status];
                  return (
                    <div key={i} className="flex gap-3">
                      <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${config.color.replace("text-", "bg-")}`} />
                      <div>
                        <p className="text-sm font-medium">{config.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(entry.changedAt)} — {entry.changedBy}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
