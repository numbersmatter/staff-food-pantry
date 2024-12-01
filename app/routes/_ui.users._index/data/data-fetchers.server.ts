import  { createClerkClient } from '@clerk/remix/api.server';
import { getServerEnv } from '~/lib/env-variables.server';
import { getActiveSemester } from '~/lib/business-logic/active-semester.server';
import { foodPantryDb } from '~/services/databases/food-pantry-db.server';


const getApplications = async () => {
  const { semesterId} = await getActiveSemester();
  const applicationSnapshot = await foodPantryDb
  .applications
  .collection
  .where(
    "semesterId",
    "==",
    semesterId
  ).get();

  const applicationDocs = applicationSnapshot.docs.map((doc) => doc.data());

  const applications = applicationDocs.map((application) => {
    return {
      id: application.id,
      primaryContact: application.primaryContact,
      status: application.status,
      userId: application.userId,
    }
  })



  return applications;
}


const getPageData = async () => {
  const {CLERK_SECRET_KEY} = getServerEnv();
  const clerk = createClerkClient({
    secretKey: CLERK_SECRET_KEY,
  });

  const clerkUsersObjects = (await clerk.users.getUserList({limit:50})).data; 

  const clerkUsers = clerkUsersObjects.map((user) =>{
    const userId =user.id.split("_",2)[1];



    return {
      clerkId: user.id,
      userId,
      fname: user.firstName,
      lname: user.lastName,
      lastSignInAt: user.lastSignInAt
    }
  })

  const applications = await getApplications();


  const allUsers =  clerkUsers.map((user)=>{
    const application = applications.find((app)=>app.userId===user.userId);

    if(!application){
      return {
        ...user,
        status: "error"
      }
    }

    return {
      ...user,
      status: application.status,
    }
  })



  return { clerkUsers, allUsers };
};

export { getPageData };