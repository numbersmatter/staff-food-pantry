import { getActiveSemester } from '~/lib/business-logic/active-semester.server';
import { foodPantryDb } from '~/services/databases/food-pantry-db.server';


const getPageData = async () => {
  const eventDocs = await foodPantryDb.events.list();
  const { semesterId, semesterInfo : info } = await getActiveSemester();
  const semesterInfo = {
    semesterId,
    semesterName: info.semesterName,
  };

  const events = eventDocs.map((doc) => {
    return {
      id: doc.id,
      name: doc.name,
      type: doc.type,
      eventDate: doc.eventDate.toDateString(),
      stage: doc.stage,
    };
  });

  return { events, eventDocs, semesterInfo };
};





export { getPageData };