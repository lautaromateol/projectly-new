import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>["form"]
type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$patch"], 200>["data"]

export function useUpdateProject() {

  const projectId = useProjectId()
  const workspaceId = useWorkspaceId()

  const queryClient = useQueryClient()

  const { mutate: updateProject, isPending: isUpdatingProject } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.projects[":projectId"]["$patch"]({
        form,
        param: { projectId },
        query: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to update project.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} updated.`)
      queryClient.invalidateQueries({ queryKey: ["projects", { workspaceId }] })
      queryClient.invalidateQueries({ queryKey: ["project", { id: data.id }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { updateProject, isUpdatingProject }
}