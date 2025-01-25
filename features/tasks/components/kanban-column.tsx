import { InferResponseType } from "hono";
import { TaskStatus } from "@prisma/client/edge";
import { client } from "@/lib/client";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { KanbanTask } from "./kanban-task";
import { CircleCheckIcon, CircleDashedIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon } from "lucide-react";

type Tasks = InferResponseType<typeof client.api.tasks["$get"], 200>["data"]

interface KanbanColumnProps {
  status: keyof typeof TaskStatus;
  tasks: Tasks
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.TO_DO]: (
    <CircleIcon className="size-[18px] text-red-400" />
  ),
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  ),
  [TaskStatus.OVERDUE]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
}

export function KanbanColumn({ status, tasks }: KanbanColumnProps) {

  const icon = statusIconMap[status]

  return (
    <div className="w-full min-h-72 p-2 border rounded shadow bg-rose-50/30">
      <div className="flex items-center gap-x-2 border-b pb-2">
        {icon}
        <p className="text-sm font-semibold text-slate-800">{snakeCaseToTitleCase(status)}</p>
      </div>
      <div className="space-y-1 py-2">
        {tasks.map((task) => (
          <KanbanTask task={task} key={task.id} />
        ))}
      </div>
    </div>
  )
}
