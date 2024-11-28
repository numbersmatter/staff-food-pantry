import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import ChangeStage from './components/change-stage';

export const loader = async (args: LoaderFunctionArgs) => {
  await handleAuth(args);
  return {};
};

export const action = async (args: ActionFunctionArgs) => {
  await handleAuth(args);
  const formData = await args.request.formData();

  return await mutations.changeStage({ formData });
};

export default function EditEvent() {
  return (
    <>
      <ChangeStage />
    </>
  )
}