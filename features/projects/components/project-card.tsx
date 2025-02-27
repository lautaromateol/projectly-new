import { client } from "@/lib/client"
import { InferResponseType } from "hono"
import { ProjectAvatar } from "./project-avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type Project = InferResponseType<typeof client.api.projects.$get, 200>["data"][0]

interface ProjectCardInterface {
  project: Project
}

export function ProjectCard({ project }: ProjectCardInterface) {

  const incompleteTasks = project.tasks.filter((task) => task.status !== "DONE").length
  const tasksLength = project.tasks.length
  const completionPercentage = tasksLength === 0 ? 0 : (incompleteTasks / tasksLength) * 100

  return (
    <Link href={`/dashboard/${project.workspaceId}/projects/${project.id}`}>
      <div className="px-4 py-2 rounded shadow w-full lg:w-64 space-y-4 transform transition duration-100 hover:scale-105 cursor-pointer">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            imageUrl={project.imageUrl ?? ""}
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm">Progress</p>
            <p className="text-sm">{completionPercentage.toFixed(2)}%</p>
          </div>
          <Progress value={completionPercentage} />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Tasks completed</p>
          <p className="text-sm text-gray-500">{incompleteTasks} of {tasksLength}</p>
        </div>
      </div>
    </Link>
  )
}
