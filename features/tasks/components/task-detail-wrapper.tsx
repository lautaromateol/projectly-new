import { Loader2 } from "lucide-react";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskDetailModal } from "@/features/tasks/hooks/use-task-detail-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { TaskDetail } from "./task-detail";

export function TaskDetailWrapper() {

  const { id, isOpen, close } = useTaskDetailModal()
  const { task, isLoadingTask } = useGetTask({ taskId: id })

  if(!id) {
    return null
  }

  return (
    <ResponsiveModal title="Task Detail" open={isOpen} onOpenChange={close} visuallyHidden className="max-w-screen-xl min-h-[600px]">
      {isLoadingTask && (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="size-8 animate-spin text-rose-600" />
        </div>
      )}
      {
        task && (
          <TaskDetail task={task} />
        )
      }
    </ResponsiveModal>
  )
}
