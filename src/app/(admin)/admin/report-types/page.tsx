"use client";

import { useState } from "react";
import { reportTypes, currentAgency } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  FileText,
  CheckCircle2,
  Upload,
} from "lucide-react";

export default function ReportTypesPage() {
  const [types, setTypes] = useState(reportTypes);
  const [showCreate, setShowCreate] = useState(false);

  function toggleEnabled(id: string) {
    setTypes((prev) =>
      prev.map((rt) => (rt.id === id ? { ...rt, enabled: !rt.enabled } : rt))
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Report Type Management</h1>
          <p className="text-sm text-muted-foreground">
            Configure the incident types citizens can report online.
          </p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: currentAgency.primaryColor }}>
              <Plus className="mr-1.5 h-4 w-4" /> New Report Type
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Report Type</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label>Name (English)</Label>
                <Input placeholder="e.g. Vandalism" className="mt-1" />
              </div>
              <div>
                <Label>Name (French)</Label>
                <Input placeholder="e.g. Vandalisme" className="mt-1" />
              </div>
              <div>
                <Label>Description (English)</Label>
                <Textarea placeholder="Describe this report type..." className="mt-1" rows={2} />
              </div>
              <div>
                <Label>Evidence Upload Mode</Label>
                <Select defaultValue="always">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="always">Always Allowed</SelectItem>
                    <SelectItem value="by_request">By Request Only</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Property Value Threshold ($)</Label>
                <Input type="number" placeholder="e.g. 4999.99" className="mt-1" />
              </div>
              <Button className="w-full" onClick={() => setShowCreate(false)}>
                Create Report Type
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {types.map((rt) => (
          <Card key={rt.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex h-5 w-5 items-center justify-center mt-1 text-muted-foreground cursor-grab">
                  <GripVertical className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm">{rt.name}</h3>
                        <Badge variant={rt.enabled ? "default" : "secondary"} className="text-xs">
                          {rt.enabled ? "Active" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{rt.description}</p>
                    </div>
                    <Switch
                      checked={rt.enabled}
                      onCheckedChange={() => toggleEnabled(rt.id)}
                      aria-label={`Toggle ${rt.name}`}
                    />
                  </div>

                  <Separator className="my-3" />

                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {rt.fields.length} fields
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {rt.eligibilityQuestions.length} eligibility questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Upload className="h-3 w-3" />
                      Evidence: {rt.evidenceMode === "always" ? "Always" : rt.evidenceMode === "by_request" ? "By Request" : "Disabled"}
                    </div>
                    {rt.propertyValueThreshold && (
                      <div>Threshold: ${rt.propertyValueThreshold.toLocaleString()}</div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Edit2 className="mr-1.5 h-3 w-3" /> Edit Fields
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit2 className="mr-1.5 h-3 w-3" /> Edit Questions
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="mr-1.5 h-3 w-3" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
