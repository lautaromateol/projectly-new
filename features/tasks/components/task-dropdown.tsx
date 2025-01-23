import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useUpdateTaskModal } from "@/features/tasks/hooks/use-update-task-modal";
import { useTaskDetailModal } from "@/features/tasks/hooks/use-task-detail-modal";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TaskDetailWrapper } from "./task-detail-wrapper";
import { UpdateTaskFormWrapper } from "./update-task-form-wrapper";

export function TaskDropdown({ taskId }: { taskId: string }) {

  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure that you want to delete this task? This action is irreversible.",
    "destructive"
  )

  const { open } = useUpdateTaskModal()
  const { open: openTask } = useTaskDetailModal()
  const { deleteTask, isDeletingTask } = useDeleteTask({ taskId })

  async function handleDeleteTask() {
    const ok = await confirm()

    if (ok) {
      deleteTask()
    }
  }

  return (
    <DropdownMenu>
      <ConfirmationDialog />
      <UpdateTaskFormWrapper taskId={taskId} />
      <TaskDetailWrapper taskId={taskId} />
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={open} className="cursor-pointer" disabled={isDeletingTask}>
          <div className="flex items-center gap-x-2">
            <Pencil className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-medium">Edit</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem onClick={handleDeleteTask} className="cursor-pointer" disabled={isDeletingTask}>
          <div className="flex items-center gap-x-2">
            <Trash className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-medium">Delete</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem onClick={openTask} className="cursor-pointer" disabled={isDeletingTask}>
          <div className="flex items-center gap-x-2">
            <Eye className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-medium">View in detail</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
