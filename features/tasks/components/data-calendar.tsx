import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { EventContentArg } from '@fullcalendar/core/index.js'
import { InferResponseType } from "hono"
import { client } from "@/lib/client"
import { useCallback } from 'react'
import { TaskPriority, TaskStatus } from '@prisma/client/edge'
import { KanbanTask } from './kanban-task'

type Tasks = InferResponseType<typeof client.api.tasks["$get"], 200>["data"]
type Task = Tasks[0]

export function DataCalendar({ data }: { data: Tasks }) {

  const events = data.map((task) => ({
    ...task,
    title: task.name,
    date: task.dueDate
  }))

  const renderEventContent = useCallback((eventInfo: EventContentArg) => {
    const id = eventInfo.event.id
    const title = eventInfo.event.title
    const date = eventInfo.event.startStr

    const { description, status, priority, member, position, memberId, projectId } = eventInfo.event.extendedProps

    const task: Task = {
      id,
      name: title,
      description: description as string,
      dueDate: date,
      status: status as TaskStatus,
      priority: priority ? priority as TaskPriority : null,
      position: position as number,
      member: memberId ? { name: member.name as string, imageUrl: member.imageUrl as string ?? null } : null,
      memberId: memberId ?? null,
      projectId: projectId as string
    }

    return (
      <KanbanTask task={task} isCalendar />
    )
  }, [])

  return (
    <div className="py-2">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  )
}