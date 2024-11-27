import { ActionFunctionArgs, LoaderFunctionArgs, Outlet } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import EventDetails from './components/event-details';

export const loader = async (args: LoaderFunctionArgs) => {
  await handleAuth(args);
  const eventId = args.params.eventId as string;
  const data = await getPageData({ eventId });
  return { ...data };
};

export const action = async (args: ActionFunctionArgs) => {
  await handleAuth(args);
  return null;
};

export default function Route() {
  return (
    <>
      <EventDetails />
      <Outlet />
    </>
  )
}