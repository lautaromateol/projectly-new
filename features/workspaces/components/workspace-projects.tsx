import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { ProjectCard } from "@/features/projects/components/project-card"

export function WorkspaceProjects() {

  const { projects } = useGetProjects()

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {projects?.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  )
}
