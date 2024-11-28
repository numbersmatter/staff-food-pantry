import { data } from "react-router";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({
  applicationId,
}: {
  applicationId: string;
}) => {
  const applicationDoc = await foodPantryDb.applications.read({ id: applicationId });

  if (!applicationDoc) {
    throw data(null, { status: 404 , statusText: "Application not found" });

  }

  return { application: applicationDoc };
};

export { getPageData };
