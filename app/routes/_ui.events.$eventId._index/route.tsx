import { ActionFunctionArgs, isRouteErrorResponse, LoaderFunctionArgs, useLoaderData } from 'react-router';
import { handleAuth } from './data/auth.server';
import { getPageData } from './data/data-fetchers.server';
import RequestList from './components/request-list';
import { Route } from './+types/route';

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

export default function Page() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <RequestList />
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}


