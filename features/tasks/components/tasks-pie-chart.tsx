"use client"
import { useMemo } from "react"
import { Label, Pie, PieChart } from "recharts"
import { TaskStatus } from "@prisma/client/edge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  ["TO_DO"]: {
    label: "To Do",
  },
  ["IN_PROGRESS"]: {
    label: "In Progress",
  },
  ["IN_REVIEW"]: {
    label: "In Review",
  },
  ["DONE"]: {
    label: "Done",
  },
  ["OVERDUE"]: {
    label: "Overdue",
  },
} satisfies ChartConfig

interface TasksPieChartProps {
  chartData: {
    status: TaskStatus;
    tasks: number;
    fill: string;
  }[]
}

export function TasksPieChart({ chartData }: TasksPieChartProps) {
  const totalTasks = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.tasks, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col rounded shadow-none">
      <CardHeader className="pb-0">
        <CardTitle>Tasks summary</CardTitle>
        <CardDescription>Review the state of all your tasks.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tasks"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
