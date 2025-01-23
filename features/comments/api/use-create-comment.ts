import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { client } from "@/lib/client"

type RequestType = InferRequestType<typeof client.api.comments[":taskId"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.comments[":taskId"]["$post"], 200>["data"]

export function useCreateComment({ taskId }: { taskId: string }) {
  const workspaceId = useWorkspaceId()

  const queryClient = useQueryClient()
  const { mutate: createComment, isPending: isCreatingComment } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.comments[":taskId"]["$post"]({
        json,
        param: { taskId },
        query: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to create comment.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: () => {
      toast.success("Comment created succesfully.")
      queryClient.invalidateQueries({ queryKey: ["comments", { taskId }] })
    }
  })

  return { createComment, isCreatingComment }
}
