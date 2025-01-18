"use client"
import { CreateWorkspaceFormWrapper } from "@/features/workspaces/components/create-workspace-form-wrapper"
import { useEffect, useState } from "react"

export function ModalProviders() {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isMounted) {
    return (
      <>
        <CreateWorkspaceFormWrapper />
      </>
    )
  }
}
