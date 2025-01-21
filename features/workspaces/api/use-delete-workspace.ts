import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$delete"]>
type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$delete"], 200>["data"]

export function useDeleteWorkspace() {
  const workspaceId = useWorkspaceId()
  
  const queryClient = useQueryClient()

  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.workspaces[":workspaceId"]["$delete"]({
        param: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to delete workspace.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} deleted.`)
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      queryClient.invalidateQueries({ queryKey: ["workspace", { id: data.id }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { deleteWorkspace, isDeletingWorkspace }
}