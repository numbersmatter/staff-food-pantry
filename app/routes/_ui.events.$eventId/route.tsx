import { ActionFunctionArgs, isRouteErrorResponse, LoaderFunctionArgs, Outlet, useLoaderData } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import EventDetails from './components/event-details';
import EventsHeader from './components/events-header';
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
  const loaderData = useLoaderData<typeof loader>();
  return (
    <>
      <EventsHeader />
      <Outlet context={loaderData} />
    </>
  )
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}
