import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$patch"]>
type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$patch"], 200>["data"]

export function useUpdateWorkspace({ workspaceId }: { workspaceId: string; }) {
  const queryClient = useQueryClient()

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces[":workspaceId"]["$patch"]({
        form,
        param: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to update workspace.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} updated.`)
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      queryClient.invalidateQueries({ queryKey: ["workspace", { id: data.id }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { updateWorkspace, isUpdatingWorkspace }
}