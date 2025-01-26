"use client"
import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { columns } from "./columns";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTasks } from "../api/use-delete-tasks";
import { DataKanban } from "./data-kanban";
import { DataCalendar } from "./data-calendar";

export function TasksTabs() {

  const { tasks, isLoadingTasks } = useGetTasks()

  const { deleteTasks, isDeletingTasks } = useDeleteTasks()

  const [ConfirmDelete, confirm] = useConfirm(
    "Delete Tasks",
    "Are you sure that you want to delete this tasks? This action is irreversible.",
    "destructive"
  )

  return (
    <Tabs defaultValue="table">
      <ConfirmDelete />
      <TabsList>
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="kanban">Kanban</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <DataTable
          filterKey="name"
          columns={columns}
          data={tasks ?? []}
          disabled={isLoadingTasks || isDeletingTasks}
          onDelete={async (rows, setSelectedRows) => {
            const ok = await confirm()

            if (ok) {
              const ids = rows.map((row) => row.original.id)

              deleteTasks({ ids }, {
                onSuccess: () => setSelectedRows({})
              })
            }
          }}
        />
      </TabsContent>
      <TabsContent value="kanban">
        <DataKanban data={tasks ?? []} />
      </TabsContent>
      <TabsContent value="calendar">
        <DataCalendar data={tasks ?? []} />
      </TabsContent>
    </Tabs>
  )
}
