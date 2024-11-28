import { Form, useRouteLoaderData } from "react-router";
import { CheckCircle2Icon, XIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { loader as eventLoader } from "~/routes/_ui.events.$eventId/route"
import { useState } from "react";



export default function ChangeStage() {
  // @ts-expect-error loader is always called
  const { event } = useRouteLoaderData<typeof eventLoader>("routes/_ui.events.$eventId");
  const [newStage, setNewStage] = useState(event.stage);




  return (
    <div
      className="col-span-1 flex flex-col divide-y divide-gray-200 md:rounded-lg bg-white text-center shadow"
    >
      <div className="flex flex-1 flex-col p-8">
        {/* <img alt="" src={person.imageUrl} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" /> */}
        <h3 className="mt-6 text-xl font-medium text-gray-900">
          Current Stage
        </h3>
        <div>
          <p>{event.stage}</p>
        </div>
        <div className="mt-6">
          <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
            New Stage
          </label>
          <select
            id="stage"
            name="stage"
            className="mt-1 mx-auto  block max-w-sm rounded-md border-gray-800 py-2 pl-3 pr-10 font-medium text-base bg-gray-200  focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={newStage}
            onChange={(e) => setNewStage(e.target.value)}
          >
            <option value="planning">Planning</option>
            <option value="open-for-requests">Open for Requests</option>
            <option value="open-for-pickups">Open for Pickups</option>
            <option value="event-finished">Event Finished</option>
          </select>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="-ml-px flex w-0 flex-1">
            <div
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <XIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
              cancel
            </div>
          </div>
          <div className="flex w-0 flex-1">
            <Form method="post"
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <input type="hidden" name="eventId" value={event.id} />
              <input type="hidden" name="stage" value={newStage} />
              <Button type="submit" name="intent" value="update-stage" variant="outline" className="flex justify-between gap-1 ">
                <CheckCircle2Icon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                Submit
              </Button>
            </Form>
          </div>

        </div>
      </div>
      <pre>
        {JSON.stringify(event, null, 2)}
      </pre>
    </div>

  )
}
