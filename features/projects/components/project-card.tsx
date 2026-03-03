import { client } from "@/lib/client";
import { InferResponseType } from "hono";
import { ProjectAvatar } from "./project-avatar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type Project = InferResponseType<typeof client.api.projects.$get, 200>["data"][0];

interface ProjectCardInterface {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardInterface) {
  const doneTasks = project.tasks.filter((task) => task.status === "DONE").length;
  const tasksLength = project.tasks.length;
  const completionPercentage = tasksLength === 0 ? 0 : (doneTasks / tasksLength) * 100;

  return (
    <Link href={`/dashboard/${project.workspaceId}/projects/${project.id}`}>
      <div className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer">
        {/* Project header */}
        <div className="flex items-start gap-x-3 mb-5">
          <ProjectAvatar
            name={project.name}
            imageUrl={project.imageUrl ?? ""}
            className="size-9 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-rose-600 transition-colors leading-tight">
              {project.name}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {tasksLength} task{tasksLength !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Progress</span>
            <span className="text-xs font-semibold text-slate-700">{completionPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-1.5 bg-slate-100" />
        </div>

        {/* Footer */}
        <div className="flex items-center gap-x-1.5 mt-4 pt-4 border-t border-slate-100">
          <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
          <p className="text-xs text-slate-500">
            {doneTasks} of {tasksLength} completed
          </p>
        </div>
      </div>
    </Link>
  );
}
