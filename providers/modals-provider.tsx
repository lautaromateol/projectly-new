"use client"
import { useEffect, useState } from "react"
import { WorkspaceMembersWrapper } from "@/features/members/components/workspace-members-wrapper"
import { WorkspaceSettingsWrapper } from "@/features/settings/components/workspace-settings-wrapper"
import { CreateWorkspaceFormWrapper } from "@/features/workspaces/components/create-workspace-form-wrapper"
import { CreateProjectFormWrapper } from "@/features/projects/components/create-project-form-wrapper"
import { UpdateProjectFormWrapper } from "@/features/projects/components/update-project-form-wrapper"

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
        <WorkspaceMembersWrapper />
        <CreateProjectFormWrapper />
        <UpdateProjectFormWrapper />
      </>
    )
  }
}
