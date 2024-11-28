import { Link, useLoaderData } from "react-router";
import { ChevronRightIcon } from "lucide-react"
import { loader } from "../route";
import { Badge } from "~/components/ui/badge";
// import { Avatar } from "~/components/ui/avatar";


export default function ApplicationsList() {
  const { applications } = useLoaderData<typeof loader>();
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {applications.map((application) => (
        <li key={application.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            {application.status === "accepted" &&
              <Badge className="bg-green-600 ring-1 ring-inset">Accepted</Badge>
            }
            {application.status === "pending" &&
              <Badge className="bg-yellow-500 ring-1 ring-inset">
                Pending
              </Badge>
            }
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <Link to={`${application.id}`}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {application.lname}, {application.fname}
                </Link>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                {application.date}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {application.phone}
              </p>

            </div>
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
          </div>
        </li>
      ))}
    </ul>
  )
}


