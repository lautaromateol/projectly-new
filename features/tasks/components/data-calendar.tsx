import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useCallback } from 'react'
import { InferResponseType } from "hono"
import { TaskPriority, TaskStatus } from '@prisma/client/edge'
import { EventContentArg } from '@fullcalendar/core/index.js'
import { client } from "@/lib/client"
import { KanbanTask } from './kanban-task'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

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

    const { description, status, priority, member, position, memberId, projectId, createdAt, updatedAt } = eventInfo.event.extendedProps

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
      projectId: projectId as string,
      createdAt,
      updatedAt
    }

    return (
      <KanbanTask task={task} isCalendar />
    )
  }, [])

  return (
    <div className="h-screen py-2">
      <ScrollArea className="h-full">
        <div className="min-w-[800px]">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridWeek"
            events={events}
            eventContent={renderEventContent}
            height="auto"
            contentHeight="auto"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}