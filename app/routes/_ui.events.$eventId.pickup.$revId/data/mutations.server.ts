import { FieldValue } from "firebase-admin/firestore";
import { data, redirect } from "react-router";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server"


const confirmPickup = async ({
  reserveId, staffId, eventId
}:{
  reserveId: string, 
  staffId: string, 
  eventId: string
})=>{

  const reservation = await foodPantryDb.reservations.read(reserveId);
  if(!reservation){
    throw data("No reservation found", { status: 404})
  }

  const updateReservation = foodPantryDb.reservations.update

  const updateData = {
    deliveryTimestamp: FieldValue.serverTimestamp(),
	  status: "delivered",
	  staffId,
  }

  await updateReservation({
    id: reserveId,
    data: {
      deliveryDetails: updateData
    }
  })



  return redirect(`/events/${eventId}/pickup`)

}




export const mutations = {confirmPickup}
