import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData } from 'react-router';
import { handleAuth } from './data/auth.server';
import { getPageData } from './data/data-fetchers.server';
import RequestList from './components/request-list';

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