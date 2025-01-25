import { CircleCheckIcon, CircleDashedIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon } from "lucide-react";
import { InferResponseType } from "hono";
import { TaskStatus } from "@prisma/client/edge";
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { client } from "@/lib/client";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { KanbanTask } from "./kanban-task";

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
      <Droppable droppableId={status}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-1 py-2">
            {tasks.map((task, i) => (
              <Draggable key={task.id} draggableId={task.id} index={i}>
                {(provided) => (
                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <KanbanTask task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
