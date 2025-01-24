import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetTaskActivityLogs({ taskId }: { taskId: string }) {
  const { data: activityLogs, isLoading: isLoadingActivityLogs } = useQuery({
    queryKey: ["activity-logs", { taskId }],
    queryFn: async() => {
      const response = await client.api["activity-logs"][":taskId"].$get({
        param: { taskId }
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