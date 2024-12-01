import EventsList from "~/routes/_ui.events._index/components/events_list";
import { getPageData } from "~/routes/_ui.events._index/data/data-fetchers";
import type { Route } from "./+types/route"
import PageHeader from "./components/page-header";


export async function loader({ params }: Route.LoaderArgs) {
  const pageData = await getPageData();
  return { ...pageData };
}

export default function Route() {
  return (
    <>
      <PageHeader />
      <EventsList />
    </>)
}