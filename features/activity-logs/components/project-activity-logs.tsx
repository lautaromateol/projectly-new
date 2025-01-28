import { useGetProjectActivityLogs } from "@/features/activity-logs/api/use-get-project-activity-logs";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ActivityLog } from "./activity-log";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectActivityLogs() {

  const { activityLogs, isLoadingActivityLogs } = useGetProjectActivityLogs()

  return (
    <Card className="flex flex-col rounded shadow-none gap-y-3">
     <CardHeader className="pb-0">
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Don&apos;t miss what&apos;s happening in the project.</CardDescription>
      </CardHeader>
      <ScrollArea className="h-28 lg:h-64">
        <div className="flex flex-col gap-y-2 px-4">
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
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </Card>
  )
}
