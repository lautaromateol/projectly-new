"use client"
import { User } from "lucide-react"
import { InferResponseType } from "hono"
import { format } from "date-fns"
import { ColumnDef } from "@tanstack/react-table"
import { TaskPriority, TaskStatus } from "@prisma/client/edge"
import { MemberAvatar } from "@/features/members/components/member-avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { client } from "@/lib/client"
import { cn, snakeCaseToTitleCase } from "@/lib/utils"
import { TaskDropdown } from "./task-dropdown"

type Task = InferResponseType<typeof client.api.tasks["$get"], 200>["data"][0]

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string

      return (
        <p className="text-sm font-semibold">{name}</p>
      )
    }
  },
  {
    accessorKey: "memberId",
    header: "Assigned to",
    cell: ({ row }) => {
      const task = row.original
      const member = task.member

      if (!member) {
        return (
          <div className="flex items-center gap-x-2">
            <div className="grid place-content-center rounded-full bg-slate-200 p-2 size-6">
              <User className="text-muted-foreground size-4" />
            </div>
            <p className="text-muted-foreground text-sm">Unassigned</p>
          </div>
        )
      }

      return (
        <div className="flex items-center gap-x-2">
          <MemberAvatar
            name={member.name}
            imageUrl={member.imageUrl ?? ""}
          />
          <p className="text-sm font-medium">{member.name}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "dueDate",
    header: "Due date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as string
      const formattedDate = format(new Date(dueDate), "PPP")

      return (
        <p className="text-sm font-medium">{formattedDate}</p>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TaskStatus

      return (
        <Badge variant={TaskStatus[status]}>{snakeCaseToTitleCase(TaskStatus[status])}</Badge>
      )
    }
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as TaskPriority

      return (
        <p className={cn(
          "text-sm font-medium",
          priority === TaskPriority.HIGH ? "text-rose-500" : priority === TaskPriority.MEDIUM ? "text-amber-500" : "text-emerald-500"
        )}>{snakeCaseToTitleCase(TaskPriority[priority])}</p>
      )
    }
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const taskId = row.getValue("id") as string

      return (
        <TaskDropdown taskId={taskId} />
      )
    }
  }
]
