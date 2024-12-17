import { ChevronRightIcon } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { loader } from "../route";
import { convertTo12Hour } from "~/lib/utils";





export default function OrderedPickupList() {
  const { reservations, slots } = useLoaderData<typeof loader>();

  return (
    <>
      {
        slots.map((slot) => {
          const timeSlot = convertTo12Hour(slot);
          const reservationsAtTime = reservations.filter(r => r.time === slot)
          return (
            <div key={slot} className="relative">
              <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-200 px-3 py-1.5 text-sm/6 font-semibold text-gray-900">
                <h3>{timeSlot}</h3>
              </div>



              {
                reservations.length === 0 && <p className="text-sm text-gray-500">
                  No Reservations
                </p>
              }
              <ul
                role="list"
                className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
              >
                {reservationsAtTime.map((r) => {
                  const timeSlot = convertTo12Hour(r.time);
                  const createdDate = r.createdDate.toLocaleDateString();
                  return (
                    <li key={r.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            <Link to={r.id}>
                              <span className="absolute inset-x-0 -top-px bottom-0" />
                              {`${r.primaryContact.fname} ${r.primaryContact.lname}`}
                            </Link>
                          </p>
                          <div className="flex flex-row gap-5">

                            <p className="mt-1 flex text-xs leading-5 text-gray-500">
                              {timeSlot}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-x-4">
                        <div className="flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {r.confirm}
                          </p>
                        </div>
                        <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
    </>


  )
}

