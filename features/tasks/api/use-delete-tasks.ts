import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.tasks["bulk-delete"][":projectId"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.tasks["bulk-delete"][":projectId"]["$post"], 200>["message"]

export function useDeleteTasks() {

  const projectId = useProjectId()

  const queryClient = useQueryClient()

  const { mutate: deleteTasks, isPending: isDeletingTasks } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tasks["bulk-delete"][":projectId"]["$post"]({
        json,
        param: { projectId }
      })

      if (!response.ok) {
        throw new Error("Failed to delete tasks.")
      }

      const { message } = await response.json()

      return message
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["tasks", { projectId }] })
      queryClient.invalidateQueries({ queryKey: ["summary", { projectId }] })
      queryClient.invalidateQueries({ queryKey: ["activity-logs", { projectId }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { deleteTasks, isDeletingTasks }
}