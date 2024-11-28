import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import { Route } from './+types/route';
import UsersList from './components/users-list';

export const loader = async (args: Route.LoaderArgs) => {
  await handleAuth(args);
  const data = await getPageData();
  return { ...data };
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  return null;
};

export default function UsersRoute() {
  return (
    <>
      <UsersList />
    </>
  )
}