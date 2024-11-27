import EventsList from "~/routes/_ui.events._index/components/events_list";
import { getPageData } from "~/routes/_ui.events._index/data/data-fetchers";
import type { Route } from "./+types/route"


export async function loader({ params }: Route.LoaderArgs) {
  const pageData = await getPageData();
  return { ...pageData };
}

export default function Route() {
  return (
    <>
      <h1>Events</h1>
      <div className='flex flex-col gap-4 py-4'>
        {/* <CreateNewEvent /> */}
      </div>
      <EventsList />
    </>)
}