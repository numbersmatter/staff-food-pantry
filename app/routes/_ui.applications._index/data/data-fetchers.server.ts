import { getActiveSemester } from "~/lib/business-logic/active-semester.server";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async () => {
  const { semesterId, semesterInfo } = await getActiveSemester();

  const applicationDocs = await foodPantryDb
    .applications
    .getAllBySemester({ semesterId });

  const applications = applicationDocs.map((app) => {
    return {
      fname: app.primaryContact.fname,
      lname: app.primaryContact.lname,
      email: app.primaryContact.email,
      phone: app.primaryContact.phone,
      status: app.status,
      id: app.id,
      date: app.createdDate.toLocaleDateString(),
    };
  });

  const statDetails = {
    totalApplications: applications.length,
    pendingApplications: applications.filter((app) => app.status === "pending")
      .length,
    acceptedApplications: applications.filter(
      (app) => app.status === "accepted"
    ).length,
    semesterInfo,
  };

  return { applications, statDetails };
};

export { getPageData };
