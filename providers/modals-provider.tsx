"use client"
import { WorkspaceSettingsWrapper } from "@/features/settings/components/workspace-settings-wrapper"
import { CreateWorkspaceFormWrapper } from "@/features/workspaces/components/create-workspace-form-wrapper"
import { useEffect, useState } from "react"

export function ModalsProvider() {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isMounted) {
    return (
      <>
        <CreateWorkspaceFormWrapper />
        <WorkspaceSettingsWrapper />
      </>
    )
  }
}
