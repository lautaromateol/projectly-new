"use client"
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useDeleteTasks } from "@/features/tasks/api/use-delete-tasks";
import { useConfirm } from "@/hooks/use-confirm";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "./columns";
import { DataKanban } from "./data-kanban";
import { DataCalendar } from "./data-calendar";
import { DataSummary } from "./data-summary";

export function TasksTabs() {

  const { tasks, isLoadingTasks } = useGetTasks()

  const { deleteTasks, isDeletingTasks } = useDeleteTasks()

  const [ConfirmDelete, confirm] = useConfirm(
    "Delete Tasks",
    "Are you sure that you want to delete this tasks? This action is irreversible.",
    "destructive"
  )

  return (
    <Tabs defaultValue="summary">
      <ConfirmDelete />
      <TabsList>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="kanban">Kanban</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <DataSummary />
      </TabsContent>
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
