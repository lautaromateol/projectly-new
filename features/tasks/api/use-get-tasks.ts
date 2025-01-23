import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.tasks.$get, 200>["data"]

export function useGetTasks() {

  const projectId = useProjectId()

  const { data: tasks, isLoading: isLoadingTasks } = useQuery<ResponseType, Error>({
    queryKey: ["tasks", { projectId }],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { projectId }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch tasks.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return { tasks, isLoadingTasks }
}