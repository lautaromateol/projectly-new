import { HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineClipboard, HiOutlinePencil } from "react-icons/hi"
import { useGetSummary } from "@/features/tasks/api/use-get-summary"
import { ProjectActivityLogs } from "@/features/activity-logs/components/project-activity-logs"
import { SummaryCard } from "./summary-card"
import { TasksPieChart } from "./tasks-pie-chart"
import { Skeleton } from "@/components/ui/skeleton"

export function DataSummary() {

  const { summary, isLoadingSummary } = useGetSummary()

  if (isLoadingSummary) {
    return (
      <div className="py-2 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Skeleton className="h-20 p-3" />
          <Skeleton className="h-20 p-3" />
          <Skeleton className="h-20 p-3" />
          <Skeleton className="h-20 p-3" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-[250px]" />
          <Skeleton className="h-[250px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="py-2 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <SummaryCard
          title="completed"
          amount={summary?.completedTasks ?? 0}
          icon={HiOutlineCheckCircle}
          variant="success"
        />
        <SummaryCard
          title="updated"
          amount={summary?.updatedTasks ?? 0}
          icon={HiOutlinePencil}
        />
        <SummaryCard
          title="created"
          amount={summary?.createdTasks ?? 0}
          icon={HiOutlineClipboard}
        />
        <SummaryCard
          title="overdued"
          amount={summary?.overdueTasks ?? 0}
          icon={HiOutlineCalendar}
          variant="danger"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TasksPieChart chartData={summary?.chartData ?? []} />
        <ProjectActivityLogs />
      </div>
    </div>
  )
}
