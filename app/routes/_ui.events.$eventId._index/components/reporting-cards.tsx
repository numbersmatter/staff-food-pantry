import { useLoaderData } from "react-router";
import { loader } from "../route";


export default function ReportingCards() {
  const { stats } = useLoaderData<typeof loader>();
  return (
    <div className="px-4 py-2">
      <h3 className="text-base font-semibold text-gray-900">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
