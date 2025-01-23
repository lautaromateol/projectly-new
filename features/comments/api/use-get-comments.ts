import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetComments({ taskId }: { taskId: string; }) {
  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", { taskId }],
    queryFn: async() => {
      const response = await client.api.comments[":taskId"]["$get"]({
        param: { taskId }
      })

      if(!response.ok) {
        throw new Error("Failed to fetch comments.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return { comments, isLoadingComments }
}