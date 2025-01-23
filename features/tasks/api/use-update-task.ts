import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"], 200>["data"]

export function useUpdateTask({ taskId }: { taskId: string }) {

  const projectId = useProjectId()

  const queryClient = useQueryClient()

  const { mutate: updateTask, isPending: isUpdatingTask } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tasks[":taskId"]["$patch"]({
        json,
        param: { taskId },
        query: { projectId }
      })

      if (!response.ok) {
        throw new Error("Failed to update task.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} updated.`)
      queryClient.invalidateQueries({ queryKey: ["tasks", { projectId }] })
      queryClient.invalidateQueries({ queryKey: ["task", { id: data.id }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { updateTask, isUpdatingTask }
}