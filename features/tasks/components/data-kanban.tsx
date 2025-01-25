import { useCallback, useEffect, useState } from "react"
import { InferResponseType } from "hono"
import { TaskStatus } from "@prisma/client/edge"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { useUpdateTasks } from "@/features/tasks/api/use-update-tasks"
import { client } from "@/lib/client"
import { KanbanColumn } from "./kanban-column"

type Tasks = InferResponseType<typeof client.api.tasks["$get"], 200>["data"]
type Task = InferResponseType<typeof client.api.tasks["$get"], 200>["data"][0]

type TasksState = {
  [key in TaskStatus]: Task[]
}

export function DataKanban({ data }: { data: Tasks }) {

  const { updateTasks } = useUpdateTasks()

  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.TO_DO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
      [TaskStatus.OVERDUE]: [],
    }

    data.forEach((task) => {
      initialTasks[task.status].push(task)
    })

    return initialTasks
  })

  const allStatus = Object.keys(TaskStatus)

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result
    const sourceStatus = source.droppableId as TaskStatus
    const destinationStatus = destination.droppableId as TaskStatus

    setTasks((prev) => {

      let updatesPayload: { id: string; status: TaskStatus; position: number; }[] = []

      const newTasks = { ...prev }

      const sourceColumn = [...newTasks[sourceStatus]]
      const [movedTask] = sourceColumn.splice(source.index, 1)

      if (!movedTask) {
        return prev
      }

      const updatedTask = sourceStatus !== destinationStatus ? { ...movedTask, status: destinationStatus } : movedTask

      newTasks[sourceStatus] = sourceColumn

      const destinationColumn = [...newTasks[destinationStatus]]
      destinationColumn.splice(destination.index, 0, updatedTask)
      newTasks[destinationStatus] = destinationColumn

      updatesPayload = []

      updatesPayload.push({
        id: updatedTask.id,
        status: destinationStatus,
        position: destination.index + 1
      })

      newTasks[destinationStatus].forEach((task, i) => {
        if (task && task.id !== updatedTask.id) {
          const newPosition = i + 1
          if (task.position !== newPosition) {
            updatesPayload.push({
              id: task.id,
              status: destinationStatus,
              position: newPosition
            })
          }
        }
      })

      if (sourceStatus !== destinationStatus) {
        newTasks[sourceStatus].forEach((task, i) => {
          if (task) {
            const newPosition = i + 1
            if (task.position !== newPosition) {
              updatesPayload.push({
                id: task.id,
                status: destinationStatus,
                position: newPosition
              })
            }
          }
        })
      }
      updateTasks({ tasks: updatesPayload })

      return newTasks
    })

  }, [updateTasks])
  

  useEffect(() => {
    const newTasks: TasksState = {
      [TaskStatus.TO_DO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
      [TaskStatus.OVERDUE]: [],
    }

    data.forEach((task) => {
      newTasks[task.status].push(task)
    })

    setTasks(newTasks)
  }, [data])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-5 gap-x-4 w-full">
        {allStatus.map((status) => {
          const taskStatus = status as keyof typeof TaskStatus
          const statusTasks = tasks[taskStatus]

          return (
            <KanbanColumn tasks={statusTasks} status={taskStatus} key={status} />
          )
        })}
      </div>
    </DragDropContext>
  )
}
