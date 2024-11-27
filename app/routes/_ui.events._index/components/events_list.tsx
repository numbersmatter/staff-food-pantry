import { ChevronRightIcon } from "lucide-react"
import { Car, PackageOpenIcon } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { loader } from "../route";




export default function EventsList() {
  const { events } = useLoaderData<typeof loader>();
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {events.map((event) => (
        <li key={event.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            {
              event.type === "pickup" && <Car aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            }
            {
              event.type === "drive-thru" && <PackageOpenIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            }
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <Link to={`/events/${event.id}`}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {event.name}, {event.type}
                </Link>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                {event.eventDate}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {event.stage}
              </p>

            </div>
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
          </div>
        </li>
      ))}
    </ul>
  )
}