import { format } from "date-fns";
import { InferResponseType } from "hono";
import { CircleAlert, CircleDotDashedIcon, UserIcon } from "lucide-react";
import { TaskPriority, TaskStatus } from "@prisma/client/edge";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { cn, snakeCaseToTitleCase } from "@/lib/utils";
import { client } from "@/lib/client";
import { Badge } from "@/components/ui/badge";
import { TaskCommentSection } from "./task-comment-section";
import { TaskDescription } from "./task-description";

type Task = InferResponseType<typeof client.api.tasks[":taskId"]["$get"], 200>["data"]

export function TaskDetail({ task }: { task: Task }) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 p-2 lg:p-4">
      <div className="space-y-6 col-span-3">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{task.name}</h2>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <CircleDotDashedIcon className="size-4 text-muted-foreground" />
              <p className="text-sm font-semibold text-muted-foreground">Status:</p>
              <Badge variant={TaskStatus[task.status]}>{snakeCaseToTitleCase(TaskStatus[task.status])}</Badge>
            </div>
            {task.priority ? (
              <div className="flex items-center gap-x-1">
                <CircleAlert className="size-4 text-muted-foreground" />
                <p className="text-sm font-semibold text-muted-foreground">Priority:</p>
                <p className={cn(
                  "text-sm font-medium",
                  task.priority === TaskPriority.HIGH ? "text-rose-500" : task.priority === TaskPriority.MEDIUM ? "text-amber-500" : "text-emerald-500"
                )}>{snakeCaseToTitleCase(TaskPriority[task.priority])}</p>
              </div>
            )
              : null
            }
          </div>
        </div>
        <TaskDescription task={task} />
        <TaskCommentSection taskId={task.id} />
      </div>
      <div className="col-span-2">
        <div className="border border-slate-200 rounded w-full">
          <div className="p-3 text-sm font-semibold text-muted-foreground border-b">Details</div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between p-2 border-b">
              <p className="text-sm font-semibol text-slate-800">Assigned to:</p>
              <div className="flex items-center gap-x-1">
                {task.member ? (
                  <>
                    <MemberAvatar
                      name={task.member.name}
                      imageUrl={task.member.imageUrl ?? ""}
                    />
                    <p className="text-sm font-medium">{task.member.name}</p>
                  </>
                )
                  : (
                    <>
                      <UserIcon className="size-6" />
                      <p className="text-sm font-medium">No assigned user.</p>
                    </>
                  )}
              </div>
            </div>
            <div className="flex items-center justify-between p-2">
              <p className="text-sm font-semibol text-slate-800">Due date:</p>
              <div className="flex items-center gap-x-1">
                <p className="text-sm font-medium">{format(new Date(task.dueDate), "PPP")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
