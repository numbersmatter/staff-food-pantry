import { getActiveSemester } from "~/lib/business-logic/active-semester.server";



const getPageData = async ()=>{
  const { semesterId, semesterInfo} = await getActiveSemester();

  return { semesterId, semesterInfo}
};

export {getPageData}