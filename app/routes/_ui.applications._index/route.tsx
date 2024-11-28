import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import ApplicationStats from './components/application-stats';
import ApplicationsList from './components/overview-card';

export const loader = async (args: LoaderFunctionArgs) => {
  await handleAuth(args);
  const data = await getPageData();
  return { ...data };
};

export const action = async (args: ActionFunctionArgs) => {
  await handleAuth(args);
  return null;
};

export default function Route() {
  return (
    <div className='p-4 flex flex-col gap-y-2'>
      <ApplicationStats />
      <ApplicationsList />
    </div>
  )
}