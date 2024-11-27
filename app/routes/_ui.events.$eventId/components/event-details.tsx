import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { loader } from "../route";
import { Link, useLoaderData } from "react-router";



export default function EventDetails() {
  const { event } = useLoaderData<typeof loader>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {event.name}
        </CardTitle>
        <CardDescription>
          Event Details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Event Date: {event.eventDate.toLocaleDateString()}</p>
        <p>Type: {event.type}</p>
        <p>Semester: {event.semesterId}</p>
        <p>Status: {event.stage}</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end gap-4">
          <Link to={`/events/${event.id}/edit`} className="">
            Edit
          </Link>

        </div>
      </CardFooter>
    </Card>
  )
}
