import { InferResponseType } from "hono"
import { client } from "@/lib/client"
import { format } from "date-fns"
import { MemberAvatar } from "@/features/members/components/member-avatar"
import { User } from "lucide-react"
import { cn, snakeCaseToTitleCase } from "@/lib/utils"
import { TaskPriority } from "@prisma/client/edge"
import { useTaskDetailModal } from "../hooks/use-task-detail-modal"

type Task = InferResponseType<typeof client.api.tasks["$get"], 200>["data"][0]

export function KanbanTask({ task }: { task: Task }) {

  const { open } = useTaskDetailModal()

  return (
    <div className="w-full rounded shadow bg-white p-2 space-y-2">
      <p onClick={() => open(task.id)} className="text-sm font-medium text-black hover:underline cursor-pointer">
        {task.name}
      </p>
      {task.priority && (
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-medium text-slate-600">Priority:</p>
          <p className={cn(
            "text-xs font-medium p-0.5 rounded",
            task.priority === TaskPriority.HIGH ? "text-rose-500 bg-rose-100" : task.priority === TaskPriority.MEDIUM ? "text-amber-500 bg-amber-100" : "text-emerald-500 bg-emerald-100"
          )}>{snakeCaseToTitleCase(TaskPriority[task.priority])}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-medium">{format(new Date(task.dueDate), "dd/MM/yyyy")}</p>
        {task.member ? (
          <MemberAvatar
            name={task.member?.name}
            imageUrl={task.member?.imageUrl ?? ""}
          />
        ) : (
          <div className="flex items-center gap-x-2">
            <p className="text-muted-foreground text-xs">Unassigned</p>
            <div className="grid place-content-center rounded-full bg-slate-200 p-2 size-6">
              <User className="text-muted-foreground size-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
