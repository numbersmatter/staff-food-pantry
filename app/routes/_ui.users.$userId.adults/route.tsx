import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import AdultsCard from './components/adults-card';
import type { Route } from './+types/route';

export const loader = async (args: Route.LoaderArgs) => {
  await handleAuth(args);
  const userId = args.params.userId as string;
  const pageData = await getPageData({ userId });
  return { ...pageData };
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  const userId = args.params.userId as string;
  const formData = await args.request.formData();

  return await mutations.updateAdults({ formData, userId });
};

export default function Route() {
  return (
    <>
      <AdultsCard />
    </>
  )
}