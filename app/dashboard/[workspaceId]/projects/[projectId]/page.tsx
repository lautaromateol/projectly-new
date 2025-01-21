"use client"
import { notFound } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useGetProject } from "@/features/projects/api/use-get-project"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"
import { ProjectDropdown } from "@/features/projects/components/project-dropdown"

export default function ProjectIdPage() {

  const { project, isLoadingProject } = useGetProject()

  if (isLoadingProject) {
    return <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="size-16 animate-spin text-rose-600" />
    </div>
  }

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            imageUrl={project.imageUrl ?? ""}
            className="size-10"
          />
          <p className="text-xl font-semibold">{project.name}</p>
          <ProjectDropdown />
        </div>
      </div>
    </div>
  )
}
