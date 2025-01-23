import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$get"], 200>["data"]


export function useGetTask({ taskId }: { taskId: string }) {

  const projectId = useProjectId()

  const { data: task, isLoading: isLoadingTask } = useQuery<ResponseType, Error>({
    queryKey: ["task", { id: taskId }],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"]["$get"]({
        param: { taskId },
        query: { projectId }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch task.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return { task, isLoadingTask }
}