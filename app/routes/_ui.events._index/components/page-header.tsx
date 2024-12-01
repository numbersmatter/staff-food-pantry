import { Link } from "react-router";

export default function PageHeader() {
  return (
    <div className="md:flex md:items-center md:justify-between px-4 py-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Events
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <Link
          to="/events/create"
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          New Event
        </Link>

      </div>
    </div>
  )
}