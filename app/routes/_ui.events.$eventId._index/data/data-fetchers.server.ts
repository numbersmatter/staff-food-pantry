import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({ eventId }: { eventId: string }) => {

  const reservations = await foodPantryDb.reservations.listByEvent({eventId})


  return { requests: reservations };
};

export { getPageData };