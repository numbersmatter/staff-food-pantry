import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import { Route } from './+types/route';
import { RegistrationTable } from './components/registration-list';
import SectionHeader from './components/section-header';
import { p } from 'node_modules/@react-router/dev/dist/routes-DHIOx0R9';

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

export default function Page() {
  return (
    <div className='px-4 py-4'>
      <SectionHeader />
      <RegistrationTable />
    </div>
  )
}