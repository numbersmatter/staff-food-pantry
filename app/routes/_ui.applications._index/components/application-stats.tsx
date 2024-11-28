import { useLoaderData } from "react-router";
import { loader } from "../route";


export default function ApplicationStats() {
  const { statDetails } = useLoaderData<typeof loader>();
  return (
    <div>
      <h3 className="text-xl font-semibold leading-6 text-gray-900">
        For {statDetails.semesterInfo.semesterName}
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Applications
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {statDetails.totalApplications}
          </dd>
        </div>
        <div
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-gray-500">
            Pending Applications
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {statDetails.pendingApplications}
          </dd>
        </div>
        <div
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-gray-500">
            Approved Applications
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {statDetails.acceptedApplications}
          </dd>
        </div>
      </dl>
    </div>
  )
}
