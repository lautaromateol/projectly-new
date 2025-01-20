"use client";
import { AlertCircle } from "lucide-react";

export default function WorkspaceError() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <AlertCircle className="size-10 text-rose-600" />
        <div className="space-y-0.5 text-center">
          <p className="text-2xl font-semibold text-rose-600">401</p>
          <p className="text-sm font-medium text-rose-600">You are not authorized to see this workspace.</p>
        </div>
      </div>
    </div>
  )
}
