"use client";

import { useState } from "react";
import { emailTemplates } from "@/data/mock";
import { EmailTemplate } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Mail, Edit2, Code2, CheckCircle2, XCircle, MessageSquare, Bell } from "lucide-react";

const typeIcons: Record<string, React.ElementType> = {
  approval: CheckCircle2,
  rejection: XCircle,
  info_request: MessageSquare,
  status_update: Bell,
};

const typeColors: Record<string, string> = {
  approval: "bg-green-50 text-green-700 border-green-200",
  rejection: "bg-red-50 text-red-700 border-red-200",
  info_request: "bg-orange-50 text-orange-700 border-orange-200",
  status_update: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function TemplatesPage() {
  const [templates] = useState(emailTemplates);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [editSubject, setEditSubject] = useState("");
  const [editBody, setEditBody] = useState("");

  function openEditor(template: EmailTemplate) {
    setEditingTemplate(template);
    setEditSubject(template.subject);
    setEditBody(template.body);
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Email Templates</h1>
        <p className="text-sm text-muted-foreground">
          Customize the email notifications sent to citizens at each stage of the reporting process.
        </p>
      </div>

      {/* Variable Reference */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm">Available Variables</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["citizen_name", "tracking_number", "occurrence_number", "officer_name", "agency_name", "rejection_reason", "info_request_details", "new_status", "custom_message"].map(
              (v) => (
                <code
                  key={v}
                  className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 font-mono"
                >
                  {"{{" + v + "}}"}
                </code>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Templates List */}
      <div className="space-y-4">
        {templates.map((template) => {
          const Icon = typeIcons[template.type] || Mail;
          return (
            <Card key={template.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{template.name}</h3>
                        <Badge variant="outline" className={`text-xs ${typeColors[template.type]}`}>
                          {template.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Subject:</strong> {template.subject}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 whitespace-pre-line">
                        {template.body.slice(0, 150)}...
                      </p>
                      <div className="flex gap-1 mt-2">
                        {template.variables.map((v) => (
                          <code
                            key={v}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-mono"
                          >
                            {v}
                          </code>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => openEditor(template)}>
                      <Edit2 className="mr-1.5 h-3 w-3" /> Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingTemplate} onOpenChange={(open) => !open && setEditingTemplate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Template — {editingTemplate?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Subject Line</Label>
              <Input
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value)}
                className="mt-1 font-mono text-sm"
              />
            </div>
            <div>
              <Label>Email Body</Label>
              <Textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="mt-1 font-mono text-sm"
                rows={12}
              />
            </div>
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-700">
              Use {"{{variable_name}}"} syntax to insert dynamic values. Variables will be replaced with actual data when the email is sent.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTemplate(null)}>
              Cancel
            </Button>
            <Button onClick={() => setEditingTemplate(null)}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
