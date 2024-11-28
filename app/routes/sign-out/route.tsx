import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import { destroySession, getSession } from '~/lib/auth/sessions.server';

export const loader = async (args: LoaderFunctionArgs) => {
  await handleAuth(args);
  return {};
};

export const action = async (args: ActionFunctionArgs) => {
  const session = await getSession(args.request.headers.get('Cookie'));

  return redirect("/sign-in", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  })

};

export default function Route() {
  return (
    <>

    </>
  )
}