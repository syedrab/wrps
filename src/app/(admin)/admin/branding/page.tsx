"use client";

import { useState } from "react";
import { currentAgency } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, Save } from "lucide-react";

export default function BrandingPage() {
  const [config, setConfig] = useState({
    name: currentAgency.name,
    shortName: currentAgency.shortName,
    primaryColor: currentAgency.primaryColor,
    secondaryColor: currentAgency.secondaryColor,
    subdomain: currentAgency.subdomain,
    phone: currentAgency.phone,
    email: currentAgency.email,
    address: currentAgency.address,
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Branding & Configuration</h1>
          <p className="text-sm text-muted-foreground">
            Customize how your agency appears to citizens on the reporting platform.
          </p>
        </div>
        <Button style={{ backgroundColor: currentAgency.primaryColor }}>
          <Save className="mr-1.5 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agency Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Agency Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Agency Full Name</Label>
              <Input
                value={config.name}
                onChange={(e) => setConfig((p) => ({ ...p, name: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Short Name / Abbreviation</Label>
              <Input
                value={config.shortName}
                onChange={(e) => setConfig((p) => ({ ...p, shortName: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Custom Subdomain / URL</Label>
              <Input
                value={config.subdomain}
                onChange={(e) => setConfig((p) => ({ ...p, subdomain: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Non-Emergency Phone</Label>
              <Input
                value={config.phone}
                onChange={(e) => setConfig((p) => ({ ...p, phone: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input
                value={config.email}
                onChange={(e) => setConfig((p) => ({ ...p, email: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={config.address}
                onChange={(e) => setConfig((p) => ({ ...p, address: e.target.value }))}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Visual Branding */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Visual Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Logo Upload */}
              <div>
                <Label>Agency Logo</Label>
                <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-gray-400 transition-colors">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl mx-auto mb-3"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click to upload logo (PNG, SVG — max 2 MB)
                  </p>
                </div>
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Colour</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig((p) => ({ ...p, primaryColor: e.target.value }))}
                      className="h-10 w-10 rounded cursor-pointer border"
                    />
                    <Input
                      value={config.primaryColor}
                      onChange={(e) => setConfig((p) => ({ ...p, primaryColor: e.target.value }))}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label>Secondary Colour</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig((p) => ({ ...p, secondaryColor: e.target.value }))}
                      className="h-10 w-10 rounded cursor-pointer border"
                    />
                    <Input
                      value={config.secondaryColor}
                      onChange={(e) => setConfig((p) => ({ ...p, secondaryColor: e.target.value }))}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm">Live Preview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl overflow-hidden border">
                {/* Mini header preview */}
                <div
                  className="px-4 py-3 flex items-center gap-3"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{config.shortName}</p>
                    <p className="text-xs text-white/70">Online Reporting</p>
                  </div>
                </div>
                {/* Mini hero preview */}
                <div
                  className="px-4 py-8 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.primaryColor}dd 100%)`,
                  }}
                >
                  <p className="text-white font-bold text-lg mb-2">Online Police Reporting</p>
                  <p className="text-white/70 text-sm mb-4">File non-emergency reports 24/7</p>
                  <span
                    className="inline-block px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: config.secondaryColor, color: config.primaryColor }}
                  >
                    File a Report
                  </span>
                </div>
                <div className="px-4 py-3 text-xs text-muted-foreground bg-gray-50">
                  {config.name} — {config.phone}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
