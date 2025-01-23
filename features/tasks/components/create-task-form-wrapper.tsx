import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateTaskForm } from "./create-task-form";

export function CreateTaskFormWrapper() {

  const { isOpen, close } = useCreateTaskModal()

  return (
    <ResponsiveModal title="Create a new Task" open={isOpen} onOpenChange={close}>
      <CreateTaskForm />
    </ResponsiveModal>
  )
}
