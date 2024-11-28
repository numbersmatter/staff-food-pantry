import { parseWithZod } from "@conform-to/zod"
import { UpdateAdultsSchema } from "./schemas"
import {  redirect } from "react-router";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const updateAdults = async({formData, userId}:{formData:FormData, userId:string})=>{

  const submission = parseWithZod(formData, {schema: UpdateAdultsSchema});

  if(submission.status !== "success"){
    return submission.reply();
  }

  await foodPantryDb.users.update({
    id: userId,
    updateData:{
      household_adults: submission.value.adults
    }
  })

  return redirect(`/users/${userId}`)
}

export const mutations = {updateAdults}
