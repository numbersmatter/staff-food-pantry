import { createClerkClient } from "@clerk/remix/api.server";
import { getServerEnv } from "~/lib/env-variables.server";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";


const getPageData = async ({ userId }: { userId: string }) => {
  const {CLERK_SECRET_KEY} = getServerEnv();
  const clerkUserId = "user_"+userId;

  const clerkClient = createClerkClient({
    secretKey: CLERK_SECRET_KEY,
  });

  const clerkUser = await clerkClient.users.getUser(clerkUserId);

  const userDoc = await foodPantryDb.users.read({id: userId});
  const address = {
    street: userDoc?.address.street ?? "none",
    unit: userDoc?.address.unit ?? "none",
    city: userDoc?.address.city ?? "none",
    state: userDoc?.address.state ?? "none",
    zip: userDoc?.address.zip ?? "none",
  }

  const email = clerkUser.primaryEmailAddress?.emailAddress ?? "none";
 


  return { clerkUser, address, email };
};

export { getPageData };