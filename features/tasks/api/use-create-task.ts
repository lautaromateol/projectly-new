import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/client";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

type RequestType = InferRequestType<typeof client.api.tasks[":projectId"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.tasks[":projectId"]["$post"], 200>["data"]

export function useCreateTask() {

  const projectId = useProjectId()

  const queryClient = useQueryClient()

  const { mutate: createTask, isPending: isCreatingTask } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tasks[":projectId"]["$post"]({
        json,
        param: { projectId }
      })

      if (!response.ok) {
        throw new Error("Failed to create task.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} created.`)
      queryClient.invalidateQueries({ queryKey: ["tasks", { projectId: data.projectId }] })
      queryClient.invalidateQueries({ queryKey: ["summary", { projectId: data.projectId }] })
      queryClient.invalidateQueries({ queryKey: ["activity-logs", { projectId: data.projectId }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { createTask, isCreatingTask }
}