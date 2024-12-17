import { useForm } from "@conform-to/react";
import { EllipsisVerticalIcon } from "lucide-react";
import { Form, useFetcher, useLoaderData, useRouteLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { SelectTrigger, Select, SelectContent, SelectValue, SelectItem } from "~/components/ui/select";
import { loader as eventLoader } from "~/routes/_ui.events.$eventId/route"
  ;




export default function PickupTimesCard() {
  const routePath = "routes/_ui.events.$eventId"
  const routeData = useRouteLoaderData<typeof eventLoader>(routePath);

  const [form, fields] = useForm({
    // onValidate({ formData }) {
    //   return parseWithZod(formData, { schema: CreateEventSchema });
    // }
  });

  const pickupTimes = routeData?.pickupTimes || [];


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Pickup Times
        </CardTitle>
        <CardDescription>
          Set the times that people can pick up their items.
        </CardDescription>
      </CardHeader>
      <CardContent>

        <PickupTimeList pickupTimes={pickupTimes} />
      </CardContent>
      <CardFooter>
        <Form
          id={form.id}
          onSubmit={form.onSubmit}
          method="post"
          className="flex flex-row gap-2"
        >
          <Input
            type="time"
            name="time"
            id="time"
          />
          <Button
            name="intent"
            value="add-pickup-time"
            type="submit"
          >
            Add Time
          </Button>
        </Form>
      </CardFooter>

    </Card>
  )
}



function PickupTimeList({ pickupTimes }: { pickupTimes: { key: string, value: string }[] }) {


  return (
    <ul className="divide-y divide-gray-100">
      {pickupTimes.map((pickupTime, index) => (
        <PickupRow
          timeId={pickupTime.key}
          displayTime={pickupTime.value}
          index={index}
          key={pickupTime.key}
        />
      )
      )}
    </ul>
  )
}




function PickupRow({ timeId, displayTime, index }: {
  timeId: string,
  displayTime: string,
  index: number
}) {
  const fetcher = useFetcher();

  const handleRemove = async () => {
    return fetcher.submit({
      intent: "remove-pickup-time",
      timeId
    }, { method: "post" });
  }

  const listNumber = index + 1;

  return <li key={timeId} className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <div className="h-12 w-12  bg-gray-50">
        {listNumber}
      </div>
      <div className="min-w-0 flex-auto">
        {displayTime}
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-x-6">
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        {/* <p className="text-sm leading-6 text-gray-900">{student.school}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          School: {student.school}
        </p> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">

          <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
        >
          <DropdownMenuLabel>

          </DropdownMenuLabel>
          {/* <DropdownMenuItem>{lang.edit}</DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleRemove}>
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </li>
}
