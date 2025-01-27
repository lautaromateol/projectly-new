import { useQuery } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { client } from "@/lib/client";

export function useGetSummary() {

  const projectId = useProjectId()

  const { data: summary, isLoading: isLoadingSummary, isSuccess } = useQuery({
    queryKey: ["summary", { projectId }],
    queryFn: async() => {
      const response = await client.api.tasks["summary"][":projectId"]["$get"]({
        param: { projectId }
      })

      if(!response.ok) {
        throw new Error("Failed to fetch analytics.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return { summary, isLoadingSummary, isSuccess }
}
