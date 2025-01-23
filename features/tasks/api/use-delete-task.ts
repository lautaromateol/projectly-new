import { InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$delete"], 200>["data"]

export function useDeleteTask({ taskId }: { taskId: string }) {

  const projectId = useProjectId()

  const queryClient = useQueryClient()

  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.tasks[":taskId"]["$delete"]({
        param: { taskId },
        query: { projectId }
      })

      if (!response.ok) {
        throw new Error("Failed to delete task.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} deleted.`)
      queryClient.invalidateQueries({ queryKey: ["tasks", { projectId: data.projectId }] })
      queryClient.invalidateQueries({ queryKey: ["task", { id: data.id }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { deleteTask, isDeletingTask }
}