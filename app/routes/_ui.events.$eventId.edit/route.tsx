import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import ChangeStage from './components/change-stage';
import PickupTimesCard from './components/pickup-times-card';
import { Route } from './+types/route';

export const loader = async (args: LoaderFunctionArgs) => {
  await handleAuth(args);
  return {};
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  const eventId = args.params.eventId
  const formData = await args.request.formData();
  const intent = formData.get('intent') as string;
  formData.set('eventId', eventId);

  if (intent === 'update-stage') {
    return await mutations.changeStage({ formData });
  }

  if (intent === 'add-pickup-time') {
    return await mutations.addPickupTime({ formData });
  }

  if (intent === 'remove-pickup-time') {
    return await mutations.removePickupTime({ formData });
  }
  return null;
};

export default function EditEvent() {
  return (
    <>
      <PickupTimesCard />
      <ChangeStage />
    </>
  )
}