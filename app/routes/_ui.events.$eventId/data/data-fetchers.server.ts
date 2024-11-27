import { getActiveSemester } from "~/lib/business-logic/active-semester.server";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({eventId}:{eventId:string}) => {
  const eventDoc = await foodPantryDb.events.read({eventId});
   if (!eventDoc) {
    throw new Response("Not Found", { status: 404, statusText: "Event Not Found" });
  }

  return { event:eventDoc};

};

export { getPageData };