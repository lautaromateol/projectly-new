import { History } from "lucide-react";
import { useGetTaskActivityLogs } from "@/features/activity-logs/api/use-get-task-activty-logs";
import { ActivityLog } from "./activity-log";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskActivityLogs({ taskId }: { taskId: string }) {

  const { activityLogs, isLoadingActivityLogs } = useGetTaskActivityLogs({ taskId })

  return (
    <div className="flex flex-col gap-y-3">
      <div className="p-2 flex items-center gap-x-1">
        <History className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold text-muted-foreground">Activity Logs</p>
      </div>
      <div className="flex flex-col gap-y-2">
        {
          isLoadingActivityLogs ? (
            <>
              <Skeleton className="h-14 rounded" />
              <Skeleton className="h-14 rounded" />
            </>
          )
            :
            (
              <>
                {activityLogs?.map((activity) => (
                  <ActivityLog activity={activity} key={activity.id} />
                ))}
              </>
            )
        }
      </div>
    </div>
  )
}
