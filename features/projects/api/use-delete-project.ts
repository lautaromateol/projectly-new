import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$delete"]>
type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$delete"], 200>["data"]

export function useDeleteProject() {

  const projectId = useProjectId()
  const workspaceId = useWorkspaceId()

  const queryClient = useQueryClient()

  const { mutate: deleteProject, isPending: isDeletingProject } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.projects[":projectId"]["$delete"]({
        param: { projectId },
        query: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to delete project.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} deleted.`)
      queryClient.invalidateQueries({ queryKey: ["projects", { workspaceId: data.workspaceId }] })
      queryClient.invalidateQueries({ queryKey: ["project", { id: data.id }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { deleteProject, isDeletingProject }
}