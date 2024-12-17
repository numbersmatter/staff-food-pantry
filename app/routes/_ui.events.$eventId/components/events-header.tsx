import { ChevronDownIcon } from "lucide-react"
import { cn } from "~/lib/utils"
import { Route } from "../+types/route"
import { NavLink, useLoaderData, useLocation, useNavigate } from "react-router"
import { loader } from "../route"
import { useEffect, useState } from 'react';
import { set } from "zod"

export default function EventsHeader() {
  const { event, tabs } = useLoaderData<typeof loader>()

  return (
    <div
      className="border-b border-gray-200 pb-5 pt-4 px-4 sm:pb-0"
    >
      <h3
        className="text-base font-semibold text-primary"
      >
        {event.name}
      </h3>
      <div className="mt-3 sm:mt-4">

        <div className="">
          <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.to}
                end={tab.end}
                reloadDocument
                className={(
                  { isActive, isPending, isTransitioning }
                ) => {
                  const styleClasses = isActive ? 'border-indigo-500 text-accent-foreground bg-accent' : ' text-gray-500 hover:text-gray-700 hover:border-gray-300'

                  return cn(
                    styleClasses,
                    'roup relative min-w-0 flex-1 overflow-hidden px-4 py-4 text-center font-medium first:rounded-l-lg last:rounded-r-lg text-lg')
                  // : cn('border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap border-b-2 px-1 pb-4 text-lg font-medium ')
                }
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
