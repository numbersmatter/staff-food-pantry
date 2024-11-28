import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import { Outlet, useLoaderData } from 'react-router';
import AddressCheckCard from './components/address-card';
import { Route } from './+types/route';

export const loader = async (args: Route.LoaderArgs) => {
  await handleAuth(args);

  const userId = args.params.userId;
  const pageData = await getPageData({ userId });
  return { ...pageData };
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  return null;
};

export default function UserIdRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h1>User: {data.clerkUser.firstName} {data.clerkUser.lastName}</h1>
      <p>{data.email}</p>
      {/* <AddressCheckCard /> */}
      <Outlet />
    </>
  )
}