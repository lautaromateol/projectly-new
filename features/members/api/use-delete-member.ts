import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$delete"]>
type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$delete"], 200>["data"]

export function useDeleteMember() {
  const queryClient = useQueryClient()

  const { mutate: deleteMember, isPending: isDeletingMember } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":memberId"]["$delete"]({
        param
      })

      if (!response.ok) {
        throw new Error("Failed to delete member.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} removed from workspace successfully.`)
      queryClient.invalidateQueries({ queryKey: ["members", { workspaceId: data.workspaceId }] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { deleteMember, isDeletingMember }
}