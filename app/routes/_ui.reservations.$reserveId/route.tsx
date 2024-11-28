import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import type { Route } from './+types/route';
import ProcessReservationCard from './components/process-reservation-card';

export const loader = async (args: Route.LoaderArgs) => {
  await handleAuth(args);
  const reservId = args.params.reserveId;

  const data = await getPageData({ reservationId: reservId });
  return { ...data };
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);

  const formData = await args.request.formData();

  return await mutations.approveReservation({ formData });
};

export default function ReservationRoute() {
  return (
    <>
      <ProcessReservationCard />
    </>
  )
}