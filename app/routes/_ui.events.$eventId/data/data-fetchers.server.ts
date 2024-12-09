import { getActiveSemester } from "~/lib/business-logic/active-semester.server";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({ eventId }: { eventId: string }) => {
  const eventDoc = await foodPantryDb.events.read({ eventId });
  if (!eventDoc) {
    throw new Response("Not Found", { status: 404, statusText: "Event Not Found" });
  }

  const timeSlots = eventDoc.timeSlots;

  // Turn timeSlots into an array of objects
  const timeSlotsArray = Object.entries(timeSlots)
  .map(([key, value]) => ({key,value}))
  .sort((a,b)=> Number(a.key) - Number(b.key))

  return { event: eventDoc, pickupTimes: timeSlotsArray };
};

export { getPageData };