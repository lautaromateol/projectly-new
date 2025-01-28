import { useQuery } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { client } from "@/lib/client";

export function useGetProjectActivityLogs() {

  const projectId = useProjectId()

  const { data: activityLogs, isLoading: isLoadingActivityLogs } = useQuery({
    queryKey: ["activity-logs", { projectId }],
    queryFn: async() => {
      const response = await client.api["activity-logs"]["project"][":projectId"].$get({
        param: { projectId }
      })

      if(!response.ok) {
        throw new Error("Failed to fetch activity logs.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return { activityLogs, isLoadingActivityLogs }
}