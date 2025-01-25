import { Loader2 } from "lucide-react";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useUpdateTaskModal } from "@/features/tasks/hooks/use-update-task-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { UpdateTaskForm } from "./update-task-form";

export function UpdateTaskFormWrapper() {

  const { id, isOpen, close } = useUpdateTaskModal()
  const { task, isLoadingTask } = useGetTask({ taskId: id })

  if (!id) {
    return null
  }

  return (
    <ResponsiveModal title="Update Task" open={isOpen} onOpenChange={close}>
      {isLoadingTask && (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="size-8 animate-spin text-rose-600" />
        </div>
      )}
      {
        task && (
          <UpdateTaskForm task={task} />
        )
      }
    </ResponsiveModal>
  )
}
