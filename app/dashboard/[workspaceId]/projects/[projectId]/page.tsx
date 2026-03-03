"use client"
import { notFound } from "next/navigation";
import { Loader2, PlusIcon } from "lucide-react";
import { TasksTabs } from "@/features/tasks/components/tasks-tabs";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { ProjectDropdown } from "@/features/projects/components/project-dropdown";
import { Button } from "@/components/ui/button";

export default function ProjectIdPage() {
  const { project, isLoadingProject } = useGetProject();
  const { open } = useCreateTaskModal();

  if (isLoadingProject) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="size-8 animate-spin text-rose-600" />
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <ProjectAvatar
            name={project.name}
            imageUrl={project.imageUrl ?? ""}
            className="size-10"
          />
          <div>
            <div className="flex items-center gap-x-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{project.name}</h1>
              <ProjectDropdown />
            </div>
            <p className="text-sm text-slate-500 mt-0.5">Project tasks</p>
          </div>
        </div>
        <Button onClick={open} className="flex items-center gap-x-1.5">
          <PlusIcon className="size-4" />
          New task
        </Button>
      </div>

      <TasksTabs />
    </div>
  );
}
