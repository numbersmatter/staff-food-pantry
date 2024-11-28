import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import SignInScreen from './components/sign-in-page';
import type { Route } from './+types/route';

export const loader = async (args: Route.LoaderArgs) => {
  const { } = await handleAuth(args);
  return {};
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  const formData = await args.request.formData();
  const cookie = args.request.headers.get("cookie")

  return await mutations.attemptSignIn({ cookie, formData });
};

export default function SignInRoute() {
  return (
    <>
      <SignInScreen />
    </>
  )
}