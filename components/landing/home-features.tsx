import { HiOutlineCalendar, HiOutlineChartBar, HiOutlineFolder } from "react-icons/hi";

export function HomeFeatures() {
  return (
    <section className="py-28 px-4 lg:px-8 bg-rose-100/30 w-full">
      <div className="space-y-1 mb-12">
        <p className="text-sm font-semibold tracking-tight uppercase text-rose-500">How It Works</p>
        <h2 className="text-4xl font-bold text-rose-700">Application Features</h2>
      </div>
      <div className="grid gird-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex items-center gap-2">
            <HiOutlineFolder className="size-10 text-rose-700" />
            <h3 className="text-lg font-bold leading-tight text-rose-700">Organize your tasks in a efficient way</h3>
          </div>
          <p className="text-base text-rose-500">Create tasks, assign a user to them, add a description, priority, status and more.</p>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex items-center gap-2">
            <HiOutlineCalendar className="size-10 text-rose-700" />
            <h3 className="text-lg font-bold leading-tight text-rose-700">Track your due dates with a calendar</h3>
          </div>
          <p className="text-base text-rose-500">Remind your tasks due dates by a calendar to deliver them in time and don&apos;t miss a release date.</p>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex items-center gap-2">
            <HiOutlineChartBar className="size-10 text-rose-700" />
            <h3 className="text-lg font-bold leading-tight text-rose-700">Review important information with analytics</h3>
          </div>
          <p className="text-base text-rose-500">Access important data about all your tasks in user-friendly analytics charts.</p>
        </div>
      </div>
    </section>
  )
}
