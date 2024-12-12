import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import { Route } from './+types/route';
import OrderedPickupCard from './components/ordered-pickup-card';

export const loader = async (args: Route.LoaderArgs) => {
  await handleAuth(args);
  const eventId = args.params.eventId;

  const data = await getPageData(eventId);
  return { ...data };
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  return null;
};

export default function Page() {
  return (
    <>
      <OrderedPickupCard />
    </>
  )
}