import { ActionFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import type { Route } from './+types/route';
import ApplicationCard from './components/application-card';

export const loader = async (args: Route.LoaderArgs) => {
  await handleAuth(args);
  const appId = args.params.appId;
  const data = await getPageData({ applicationId: appId });
  return { ...data };
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  return null;
};

export default function Route() {
  return (
    <>
      <ApplicationCard />
    </>
  )
}