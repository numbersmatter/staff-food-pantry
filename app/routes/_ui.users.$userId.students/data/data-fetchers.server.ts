import { redirect } from "react-router";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({userId}: {userId: string}) => {

  const userDoc = await foodPantryDb.users.read({id: userId});

  if(!userDoc){
    throw redirect(`/users/${userId}`)
  }


  const students = userDoc.students;
  const language = "en"

  return { students, language };
};

export { getPageData };