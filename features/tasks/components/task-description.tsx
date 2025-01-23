import { useState } from "react"
import { Text } from "lucide-react"
import { InferResponseType } from "hono"
import { useUpdateTask } from "@/features/tasks/api/use-update-task";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { client } from "@/lib/client"

type Task = InferResponseType<typeof client.api.tasks[":taskId"]["$get"], 200>["data"]

export function TaskDescription({ task }: { task: Task }) {

  const [editMode, setEditMode] = useState(false)
  const [description, setDescription] = useState(task.description)

  const { updateTask, isUpdatingTask } = useUpdateTask({ taskId: task.id })

  function handleCancelEdit() {
    setEditMode(false)
    setDescription(task.description)
  }

  function handleSave() {
    if (description.trim().length === 0) return
    updateTask({
      description
    }, {
      onSuccess: (data) => {
        setEditMode(false)
        setDescription(data.description)
      }
    })
  }

  return (
    <div className="flex flex-col">
      <div className="p-2 flex items-center gap-x-1">
        <Text className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold text-muted-foreground">Description</p>
      </div>
      {editMode ? (
        <div className="space-y-2">
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="flex items-center gap-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancelEdit}
              disabled={isUpdatingTask}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isUpdatingTask}
            >
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="hover:bg-slate-200 rounded p-2" role="button" onClick={() => setEditMode(true)}>
          <p className="text-sm font-light">{task.description}</p>
        </div>
      )}
    </div>
  )
}
