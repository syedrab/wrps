"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockReports, currentAgency } from "@/data/mock";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  Monitor,
  PhoneOff,
  MessageSquare,
  Shield,
  Circle,
} from "lucide-react";

export default function VideoCallPage() {
  const params = useParams();
  const router = useRouter();
  const report = mockReports.find((r) => r.id === params.id);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callState, setCallState] = useState<"waiting" | "connected" | "ended">("waiting");

  if (!report) {
    return (
      <div className="p-6 text-center">
        <p>Report not found.</p>
        <Button variant="outline" onClick={() => router.push("/officer/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/officer/reports/${report.id}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <p className="text-sm font-semibold">Video Call — {report.trackingNumber}</p>
            <p className="text-xs text-muted-foreground">{report.citizenName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Circle className="h-2 w-2 fill-red-500 text-red-500 animate-pulse" />
            Recording
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Shield className="h-3 w-3 text-green-600" />
            <span className="text-green-600 font-medium">End-to-end encrypted</span>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 bg-gray-900 relative flex items-center justify-center">
        {callState === "waiting" ? (
          <div className="text-center text-white">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 mx-auto mb-6">
              <VideoIcon className="h-12 w-12" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Waiting for citizen to join...</h2>
            <p className="text-sm text-white/60 mb-6">
              An invitation has been sent to {report.citizenEmail}
            </p>
            <Button
              onClick={() => setCallState("connected")}
              style={{ backgroundColor: currentAgency.secondaryColor, color: currentAgency.primaryColor }}
            >
              Simulate: Citizen Joins
            </Button>
          </div>
        ) : callState === "connected" ? (
          <>
            {/* Main video (citizen) */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white/40">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/5 mx-auto mb-4 text-4xl font-bold">
                  {report.citizenName.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="text-lg">{report.citizenName}</p>
                <p className="text-sm text-white/30">Connected</p>
              </div>
            </div>

            {/* Self view (officer) */}
            <div className="absolute bottom-24 right-4 w-48 h-36 rounded-xl bg-gray-800 border border-white/10 flex items-center justify-center overflow-hidden">
              {isVideoOn ? (
                <div className="text-center text-white/60 text-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 mx-auto mb-2">
                    DP
                  </div>
                  <p className="text-xs">You</p>
                </div>
              ) : (
                <VideoOff className="h-6 w-6 text-white/30" />
              )}
            </div>

            {/* Screen share indicator */}
            {isScreenSharing && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                You are sharing your screen
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-white">
            <PhoneOff className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <h2 className="text-lg font-semibold mb-2">Call Ended</h2>
            <p className="text-sm text-white/60 mb-4">Recording saved and uploading to DEMS...</p>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => router.push(`/officer/reports/${report.id}`)}
            >
              Return to Report
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      {callState === "connected" && (
        <div className="bg-gray-900 border-t border-white/10 px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={`h-12 w-12 rounded-full ${
                isMuted ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`h-12 w-12 rounded-full ${
                !isVideoOn ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`h-12 w-12 rounded-full ${
                isScreenSharing ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <Monitor className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setCallState("ended")}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
