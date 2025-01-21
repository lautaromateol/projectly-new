import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$get"], 200>["data"]


export function useGetProject() {

  const projectId = useProjectId()
  const workspaceId = useWorkspaceId()

  const { data: project, isLoading: isLoadingProject } = useQuery<ResponseType, Error>({
    queryKey: ["project", { id: projectId }],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"]["$get"]({
        param: { projectId },
        query: { workspaceId }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch project.")
      }

      const { data } = await response.json()
      
      return data
    }
  })

  return { project, isLoadingProject }
}