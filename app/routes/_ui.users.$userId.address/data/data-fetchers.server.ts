import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({ userId }: { userId: string }) => {

  const userProfileDoc = await foodPantryDb.users.read({id: userId})



  const address = {
    street: userProfileDoc?.address.street ?? "",
    unit: userProfileDoc?.address.unit ?? "",
    city: userProfileDoc?.address.city ?? "",
    state: userProfileDoc?.address.state ?? "",
    zip: userProfileDoc?.address.zip ?? "",
  }

  const language = "en";

  return { address, language };
};

export { getPageData };