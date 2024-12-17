import { data } from "react-router";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({reserveId}:{reserveId:string}) => {

  const reservation = await foodPantryDb.reservations.read(reserveId)

  if(!reservation){
    throw data("Reservation Not Found", { status: 404})
  }


  return { reservation };
};

export { getPageData };