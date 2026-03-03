"use client"
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectCard } from "@/features/projects/components/project-card";

export function WorkspaceProjects() {
  const { projects } = useGetProjects();

  if (!projects?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-slate-200 rounded-xl bg-white">
        <p className="text-sm text-slate-400 font-medium">No projects yet</p>
        <p className="text-xs text-slate-300 mt-1">Create your first project to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
}
