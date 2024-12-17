import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import PickupForm from './components/pickup-form';
import { Route } from './+types/route';

export const loader = async (args: Route.LoaderArgs) => {
  await handleAuth(args);
  const reserveId = args.params.revId;
  const data = await getPageData({ reserveId });
  return { ...data };
};

export const action = async (args: Route.ActionArgs) => {
  const { user } = await handleAuth(args);

  return await mutations.confirmPickup({
    reserveId: args.params.revId,
    staffId: user.uid,
    eventId: args.params.eventId
  });
};

export default function Page() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <PickupForm />

    </>
  )
}