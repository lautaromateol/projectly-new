import { InferResponseType } from "hono";
import { format } from "date-fns";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { client } from "@/lib/client";
import { generateLogMessage } from "@/lib/utils";

type Activity = InferResponseType<typeof client.api["activity-logs"][":taskId"]["$get"]>["data"][0]

export function ActivityLog({ activity }: { activity: Activity }) {
  return (
    <div className="flex items-center gap-x-2 bg-rose-100/30 rounded p-2">
      <MemberAvatar
        name={activity.member.name}
        imageUrl={activity.member.imageUrl ?? ""}
      />
      <div className="space-y-0.5">
        <p className="text-slate-700 font-medium text-sm">
          {`${activity.member.name} ${generateLogMessage({ action: activity.action, taskTitle: activity.task.name })}`}
        </p>
        <p className="text-muted-foreground text-sm">{format(new Date(activity.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
      </div>
    </div>
  )
}
