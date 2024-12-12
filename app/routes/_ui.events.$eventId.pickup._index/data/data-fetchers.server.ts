import { convertTo12Hour } from "~/lib/utils";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async (eventId:string) => {
  const reservationDocsAll = await foodPantryDb.reservations.listByEvent({eventId});

  const approvedReservations= reservationDocsAll
  .filter(r=> r.status == "approved")

  const reservationsOrdered = approvedReservations
  .sort((a,b)=> a.time - b.time)
  .map( r =>{
    const timeSlot = convertTo12Hour(r.time)

    return {
      ...r,
      timeSlot
    }

  })

  const slots = new Set<number>();
  const slotMap = new Map();

  reservationsOrdered.map(r=>{
    slots.add(r.time)
  })

  const slotArray =[...slots].map( s => {
    const reservationsAtTime = reservationsOrdered
    .filter(r=> r.time === s)

    slotMap.set( s, reservationsAtTime)

    return reservationsAtTime
  })

  const slotTimes = [...slots].sort((a,b)=> a-b)

  return { reservations: reservationsOrdered, slotMap, slots:slotTimes };
};

export { getPageData };