import { data } from "react-router";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({ reservationId }: { reservationId: string }) => {
   const reservationDoc = await foodPantryDb.reservations.read(reservationId);
   if (!reservationDoc) {
    throw data("Not Found", { status: 404, statusText: "Reservation Not Found" });
  }



  return { reservation:reservationDoc };
};

export { getPageData };