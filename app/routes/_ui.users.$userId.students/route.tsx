import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import { StudentsCard } from './components/student-cards';
import { Route } from './+types/route';


export const loader = async (args: Route.LoaderArgs) => {
  await handleAuth(args);
  const userId = args.params.userId;
  const pageData = await getPageData({ userId });
  return { ...pageData };
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  const userId = args.params.userId as string;

  const formData = await args.request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "addStudent") {
    return mutations.addStudent({ userId, formData });
  }

  return null;
};

export default function UserStudents() {
  return (
    <>
      <StudentsCard />
    </>
  )
}