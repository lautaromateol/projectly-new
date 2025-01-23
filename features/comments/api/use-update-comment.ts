import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { client } from "@/lib/client"

type RequestType = InferRequestType<typeof client.api.comments[":commentId"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.comments[":commentId"]["$patch"], 200>["data"]

export function useUpdateComment({ commentId }: { commentId: string }) {
  const workspaceId = useWorkspaceId()

  const queryClient = useQueryClient()
  const { mutate: updateComment, isPending: isUpdatingComment } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.comments[":commentId"]["$patch"]({
        json,
        param: { commentId },
        query: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to update comment.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success("Comment updated succesfully.")
      queryClient.invalidateQueries({ queryKey: ["comments", { taskId: data.taskId }] })
    }
  })

  return { updateComment, isUpdatingComment }
}
