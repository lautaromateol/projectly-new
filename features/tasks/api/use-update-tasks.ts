import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.tasks["bulk-update"][":projectId"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.tasks["bulk-update"][":projectId"]["$patch"], 200>["data"]

export function useUpdateTasks() {

  const projectId = useProjectId()

  const queryClient = useQueryClient()

  const { mutate: updateTasks, isPending: isUpdatingTasks } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tasks["bulk-update"][":projectId"]["$patch"]({
        json,
        param: { projectId }
      })

      if (!response.ok) {
        throw new Error("Failed to update tasks.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      data.forEach((id) => queryClient.invalidateQueries({ queryKey: ["task", { id }] }))
      queryClient.invalidateQueries({ queryKey: ["tasks", { projectId }] })
      queryClient.invalidateQueries({ queryKey: ["summary", { projectId }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { updateTasks, isUpdatingTasks }
}