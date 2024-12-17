import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { loader } from "../route";
import { Link, NavLink, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";



export default function EventDetails() {
  const { event, pickupTimes } = useLoaderData<typeof loader>();
  return (
    <Card className="sticky top-0 z-40">
      <CardHeader>
        <CardTitle>
          {event.name}
        </CardTitle>
        <CardDescription>
          {event.eventDate.toLocaleDateString()}
          {event.eventDate.toLocaleTimeString()}
          <span className="text-gray-500">
            - {event.stage}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end gap-4">
          <NavLink to={`/events/${event.id}/edit`}
            className={({ isActive }) => {
              const activeClasses = isActive ? 'bg-gray-500 text-gray-700' : 'text-gray-900'

              return cn('inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset hover:ring-blue-300 hover:bg-gray-300', activeClasses)
            }
            }
          >
            Edit
          </NavLink>
          <NavLink to={`/events/${event.id}/pickup`}
            className={({ isActive }) => {
              const activeClasses = isActive ? 'bg-gray-500 text-gray-700' : 'text-gray-900'

              return cn('inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset hover:ring-blue-300 hover:bg-gray-300', activeClasses)
            }
            }
          >
            Pickups
          </NavLink>

        </div>
      </CardFooter>
    </Card>
  )
}
