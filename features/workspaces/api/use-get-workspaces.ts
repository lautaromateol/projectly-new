import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.workspaces.$get, 200>["data"]

export function useGetWorskpaces() {
  const { data: workspaces, isLoading: isLoadingWorskpaces } = useQuery<ResponseType, Error>({
    queryKey: ["workspaces"],
    queryFn: async() => {
      const response = await client.api.workspaces.$get()

      if(!response.ok) {
        throw new Error("Failed to fetch workspaces.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return { workspaces, isLoadingWorskpaces }
}