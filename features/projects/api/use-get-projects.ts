import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.projects.$get, 200>["data"]

export function useGetProjects() {

  const workspaceId = useWorkspaceId()

  const { data: projects, isLoading: isLoadingProjects } = useQuery<ResponseType, Error>({
    queryKey: ["projects", { workspaceId }],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch projects.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return { projects, isLoadingProjects }
}