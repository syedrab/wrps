"use client";

import { useState } from "react";
import { officers, currentAgency } from "@/data/mock";
import { formatDate } from "@/lib/utils";
import { Officer, UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Edit2, Shield, Key } from "lucide-react";

const allUsers: (Officer & { mfaEnabled: boolean; active: boolean; lastLogin: string })[] = [
  { ...officers[0], mfaEnabled: true, active: true, lastLogin: "2026-03-17T08:30:00Z" },
  { ...officers[1], mfaEnabled: true, active: true, lastLogin: "2026-03-16T14:20:00Z" },
  { ...officers[2], mfaEnabled: true, active: true, lastLogin: "2026-03-17T09:00:00Z" },
  {
    id: "off-004",
    name: "Cst. Michael Brown",
    badgeNumber: "WR-5102",
    rank: "Constable",
    email: "michael.brown@wrps.on.ca",
    agencyId: "wrps",
    role: "reviewer" as UserRole,
    reportsAssigned: 0,
    mfaEnabled: false,
    active: false,
    lastLogin: "2026-02-28T16:00:00Z",
  },
  {
    id: "admin-001",
    name: "Sgt. Kim Marshall",
    badgeNumber: "WR-2103",
    rank: "Sergeant",
    email: "kim.marshall@wrps.on.ca",
    agencyId: "wrps",
    role: "agency_admin" as UserRole,
    reportsAssigned: 0,
    mfaEnabled: true,
    active: true,
    lastLogin: "2026-03-17T09:00:00Z",
  },
];

const roleLabels: Record<string, { label: string; color: string }> = {
  reviewer: { label: "Reviewer", color: "bg-blue-50 text-blue-700 border-blue-200" },
  supervisor: { label: "Supervisor", color: "bg-purple-50 text-purple-700 border-purple-200" },
  agency_admin: { label: "Agency Admin", color: "bg-orange-50 text-orange-700 border-orange-200" },
  esco_super_admin: { label: "ESCO Super Admin", color: "bg-red-50 text-red-700 border-red-200" },
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const filteredUsers = allUsers.filter((u) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.badgeNumber.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Users & Access Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage user accounts, roles, and access permissions.
          </p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: currentAgency.primaryColor }}>
              <Plus className="mr-1.5 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="e.g. Cst. Jane Doe" className="mt-1" />
              </div>
              <div>
                <Label>Badge Number</Label>
                <Input placeholder="e.g. WR-1234" className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="jane.doe@wrps.on.ca" className="mt-1" />
              </div>
              <div>
                <Label>Role</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reviewer">Reviewer</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="agency_admin">Agency Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require MFA</Label>
                  <p className="text-xs text-muted-foreground">Multi-factor authentication</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button onClick={() => setShowCreate(false)}>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{allUsers.length}</p>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{allUsers.filter((u) => u.active).length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{allUsers.filter((u) => u.mfaEnabled).length}</p>
            <p className="text-xs text-muted-foreground">MFA Enabled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{allUsers.filter((u) => u.role === "reviewer").length}</p>
            <p className="text-xs text-muted-foreground">Reviewers</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Badge #</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>MFA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const role = roleLabels[user.role] || { label: user.role, color: "" };
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className="text-xs"
                            style={{ backgroundColor: currentAgency.primaryColor, color: "white" }}
                          >
                            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{user.badgeNumber}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${role.color}`}>
                        {role.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.mfaEnabled ? (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          <Shield className="mr-1 h-3 w-3" /> Enabled
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          Disabled
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.active ? "default" : "secondary"} className="text-xs">
                        {user.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(user.lastLogin)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Key className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
