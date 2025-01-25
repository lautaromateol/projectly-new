import { InferResponseType } from "hono"
import { TaskStatus } from "@prisma/client/edge"
import { client } from "@/lib/client"
import { KanbanColumn } from "./kanban-column"

type Tasks = InferResponseType<typeof client.api.tasks["$get"], 200>["data"]

export function DataKanban({ tasks }: { tasks: Tasks }) {

  const allStatus = Object.keys(TaskStatus)

  return (
    <div className="grid grid-cols-5 gap-x-4 w-full">
      {allStatus.map((status) => {
        const taskStatus = status as keyof typeof TaskStatus
        const statusTasks = tasks.filter((task) => task.status === taskStatus)

        return (
          <KanbanColumn tasks={statusTasks} status={taskStatus} key={status} />
        )
      })}
    </div>
  )
}
