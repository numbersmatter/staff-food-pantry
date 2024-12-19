import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({ eventId }: { eventId: string }) => {

  const reservationsDocs = await foodPantryDb
  .reservations
  .listByEvent({eventId});

  const reservations = reservationsDocs
  .sort((a,b)=>a.createdDate.valueOf() - b.createdDate.valueOf())


  const approvedReservations= reservationsDocs
  .filter(r=> r.status == "approved")

  const reservationsDelivered = approvedReservations
  .map( r => {
    const deliveryStatus = r.deliveryDetails?.status ?? "waiting"

    return {
      ...r,
      deliveryStatus,
    }
  })
  .filter( r => r.deliveryStatus ==="delivered")

  const userIds = reservationsDelivered.map(r=> r.userId);

  


  const stats = [
  { name: 'Adults', stat: '71,897' },
  { name: 'Children', stat: '58.16%' },
  { name: 'High School', stat: '24.57%' },
  { name: 'Middle School', stat: '24.57%' },
  { name: 'Elementary School', stat: '24.57%' },
  { name: 'Primary School', stat: '24.57%' },
]


  return { requests: reservations, stats };
};

export { getPageData };