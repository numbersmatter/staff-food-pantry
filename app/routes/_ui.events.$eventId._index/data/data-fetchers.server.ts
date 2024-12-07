import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({ eventId }: { eventId: string }) => {

  const reservationsDocs = await foodPantryDb
  .reservations
  .listByEvent({eventId});

  const reservations = reservationsDocs
  .sort((a,b)=>a.createdDate.valueOf() - b.createdDate.valueOf())


  return { requests: reservations };
};

export { getPageData };