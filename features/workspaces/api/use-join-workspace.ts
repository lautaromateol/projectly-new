import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.workspaces["join"][":inviteCode"]["$patch"]>
type ResponseType = InferResponseType<typeof client.api.workspaces["join"][":inviteCode"]["$patch"], 200>["data"]

export function useJoinWorkspace() {
  const queryClient = useQueryClient()

  const { mutate: joinWorkspace, isPending: isJoiningWorkspace } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces["join"][":inviteCode"]["$patch"]({
        param
      })

      if (!response.ok) {
        throw new Error("Failed to join workspace.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success(`You have joined ${data.name}`)
      queryClient.invalidateQueries({ queryKey: ["members", { workspaceId: data.id }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { joinWorkspace, isJoiningWorkspace }
}