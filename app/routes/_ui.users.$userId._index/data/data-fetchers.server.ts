import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({userId}: {userId:string}) => {

  const registrationsCollection =  foodPantryDb.registrations.collection

  const querySnapshot =  await registrationsCollection
  .where("userId", "==",userId).get()

  const queryDocs = querySnapshot.docs.map(d => d.data())

  const userRegistrations = queryDocs.map(d => {

    return {
      id: d.id,
      userId: d.userId,
      created: d.createdDate,
      semesterName: "Fall 2024",
      semesterId: d.semesterId
    }
  })


  return { userRegistrations };
};

export { getPageData };