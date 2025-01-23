import { toast } from "sonner"
import { InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { client } from "@/lib/client"

type ResponseType = InferResponseType<typeof client.api.comments[":commentId"]["$delete"], 200>["data"]

export function useDeleteComment({ commentId }: { commentId: string }) {
  const workspaceId = useWorkspaceId()

  const queryClient = useQueryClient()
  const { mutate: deleteComment, isPending: isDeletingComment } = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.comments[":commentId"]["$delete"]({
        param: { commentId },
        query: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to delete comment.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success("Comment deleted succesfully.")
      queryClient.invalidateQueries({ queryKey: ["comments", { taskId: data.taskId }] })
    }
  })

  return { deleteComment, isDeletingComment }
}
