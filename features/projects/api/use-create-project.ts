import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/client";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

type RequestType = InferRequestType<typeof client.api.projects[":workspaceId"]["$post"]>["form"]
type ResponseType = InferResponseType<typeof client.api.projects[":workspaceId"]["$post"], 200>["data"]

export function useCreateProject() {

  const workspaceId = useWorkspaceId()

  const queryClient = useQueryClient()

  const { mutate: createProject, isPending: isCreatingProject } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.projects[":workspaceId"]["$post"]({
        form,
        param: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to create project.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} created.`)
      queryClient.invalidateQueries({ queryKey: ["projects", { workspaceId: data.workspaceId }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { createProject, isCreatingProject }
}