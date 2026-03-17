"use client";

import { useState, useMemo } from "react";
import { checklistSections, statusLabels, ChecklistStatus, Priority } from "@/data/checklist";
import { currentAgency } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Search,
  CheckCircle2,
  Circle,
  AlertCircle,
  MinusCircle,
  Ban,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Filter,
} from "lucide-react";

const statusIcons: Record<ChecklistStatus, React.ElementType> = {
  ui_complete: CheckCircle2,
  needs_backend: Circle,
  partial: AlertCircle,
  not_started: MinusCircle,
  out_of_scope: Ban,
};

const priorityColors: Record<Priority, string> = {
  MUST: "bg-red-50 text-red-700 border-red-200",
  SHOULD: "bg-yellow-50 text-yellow-700 border-yellow-200",
  MAY: "bg-gray-50 text-gray-600 border-gray-200",
};

export default function ChecklistPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const allItems = useMemo(
    () => checklistSections.flatMap((s) => s.items),
    []
  );

  const filteredSections = useMemo(() => {
    return checklistSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          if (statusFilter !== "all" && item.status !== statusFilter) return false;
          if (priorityFilter !== "all" && item.priority !== priorityFilter) return false;
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return (
              item.requirement.toLowerCase().includes(q) ||
              item.notes.toLowerCase().includes(q) ||
              item.prdRef.toLowerCase().includes(q)
            );
          }
          return true;
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery, statusFilter, priorityFilter]);

  const stats = useMemo(() => {
    const counts: Record<ChecklistStatus, number> = {
      ui_complete: 0,
      needs_backend: 0,
      partial: 0,
      not_started: 0,
      out_of_scope: 0,
    };
    for (const item of allItems) {
      counts[item.status]++;
    }
    return counts;
  }, [allItems]);

  const total = allItems.length;
  const actionable = total - stats.out_of_scope;
  const completionRate = actionable > 0 ? Math.round(((stats.ui_complete) / actionable) * 100) : 0;
  const partialRate = actionable > 0 ? Math.round(((stats.ui_complete + stats.partial) / actionable) * 100) : 0;

  const mustItems = allItems.filter((i) => i.priority === "MUST");
  const mustComplete = mustItems.filter((i) => i.status === "ui_complete").length;
  const mustActionable = mustItems.filter((i) => i.status !== "out_of_scope").length;
  const mustRate = mustActionable > 0 ? Math.round((mustComplete / mustActionable) * 100) : 0;

  function toggleSection(id: string) {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          PRD Implementation Checklist
        </h1>
        <p className="text-sm text-muted-foreground">
          Tracking all requirements from WRPS ESCO ORP PRD v1.0 (P2026-03)
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {(Object.entries(statusLabels) as [ChecklistStatus, typeof statusLabels[ChecklistStatus]][]).map(
          ([key, config]) => {
            const Icon = statusIcons[key];
            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all ${statusFilter === key ? "ring-2 ring-primary" : ""}`}
                onClick={() => setStatusFilter(statusFilter === key ? "all" : key)}
              >
                <CardContent className="p-3 text-center">
                  <Icon className={`h-4 w-4 mx-auto mb-1 ${config.color}`} />
                  <p className="text-2xl font-bold">{stats[key]}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{config.label}</p>
                </CardContent>
              </Card>
            );
          }
        )}
        <Card>
          <CardContent className="p-3 text-center">
            <ClipboardList className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Total Items</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Overall UI Complete</p>
              <span className="text-sm font-bold" style={{ color: currentAgency.primaryColor }}>
                {completionRate}%
              </span>
            </div>
            <Progress value={completionRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {stats.ui_complete} of {actionable} actionable items
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">UI Complete + Partial</p>
              <span className="text-sm font-bold text-yellow-600">{partialRate}%</span>
            </div>
            <Progress value={partialRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {stats.ui_complete + stats.partial} of {actionable} actionable items
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">MUST Requirements (UI)</p>
              <span className="text-sm font-bold text-red-600">{mustRate}%</span>
            </div>
            <Progress value={mustRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {mustComplete} of {mustActionable} MUST items complete
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requirements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-3 w-3 mr-2" />
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {(Object.entries(statusLabels) as [ChecklistStatus, typeof statusLabels[ChecklistStatus]][]).map(
              ([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label} ({stats[key]})
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="MUST">MUST ({allItems.filter((i) => i.priority === "MUST").length})</SelectItem>
            <SelectItem value="SHOULD">SHOULD ({allItems.filter((i) => i.priority === "SHOULD").length})</SelectItem>
            <SelectItem value="MAY">MAY ({allItems.filter((i) => i.priority === "MAY").length})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {filteredSections.map((section) => {
          const isCollapsed = collapsedSections.has(section.id);
          const sectionComplete = section.items.filter((i) => i.status === "ui_complete").length;
          const sectionTotal = section.items.length;

          return (
            <Card key={section.id}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <h2 className="font-semibold text-sm">{section.title}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {sectionComplete}/{sectionTotal} complete
                  </span>
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${sectionTotal > 0 ? (sectionComplete / sectionTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </button>

              {/* Section items */}
              {!isCollapsed && (
                <div className="border-t">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-xs">
                        <TableHead className="w-[50px]">Status</TableHead>
                        <TableHead className="w-[60px]">Priority</TableHead>
                        <TableHead>Requirement</TableHead>
                        <TableHead className="hidden lg:table-cell w-[300px]">Notes</TableHead>
                        <TableHead className="w-[60px]">PRD Ref</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {section.items.map((item) => {
                        const StatusIcon = statusIcons[item.status];
                        const statusStyle = statusLabels[item.status];
                        return (
                          <TableRow key={item.id} className="text-sm">
                            <TableCell>
                              <div className="flex items-center gap-1.5" title={statusStyle.label}>
                                <StatusIcon className={`h-4 w-4 ${statusStyle.color}`} />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`text-[10px] px-1.5 py-0 ${priorityColors[item.priority]}`}
                              >
                                {item.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm">{item.requirement}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 lg:hidden">
                                {item.notes}
                              </p>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                              {item.notes}
                            </TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground">
                              {item.prdRef}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {filteredSections.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
          <p>No requirements match your filters.</p>
        </div>
      )}
    </div>
  );
}
