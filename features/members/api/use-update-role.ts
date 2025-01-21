import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$patch"]>
type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"], 200>["data"]

export function useUpdateRole() {
  const queryClient = useQueryClient()

  const { mutate: updateRole, isPending: isUpdatingRole } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.members[":memberId"]["$patch"]({
        json,
        param
      })

      if (!response.ok) {
        throw new Error("Failed to update member role.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`${data.name} role updated successfully.`)
      queryClient.invalidateQueries({ queryKey: ["members", { workspaceId: data.workspaceId }] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { updateRole, isUpdatingRole }
}