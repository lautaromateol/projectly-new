import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$get"], 200>["data"]


export function useGetWorkspace() {

  const workspaceId = useWorkspaceId()

  const { data: workspace, isLoading: isLoadingWorkspace } = useQuery<ResponseType, Error>({
    queryKey: ["workspace", { id: workspaceId }],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"]["$get"]({
        param: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch workspace.")
      }

      const { data } = await response.json()
      
      return data
    }
  })

  return { workspace, isLoadingWorkspace }
}