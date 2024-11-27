import { parseWithZod } from "@conform-to/zod"
import { CreateNewEventSchema } from "./schemas"
import { redirect } from "react-router"
import { foodPantryDb } from "~/services/databases/food-pantry-db.server"


const makeEvent = async ({formData}:{formData: FormData})=>{
  const submission = parseWithZod(formData, { schema: CreateNewEventSchema})

  if(submission.status !== "success"){
    return submission.reply()
  }

  const eventId = await foodPantryDb.events.create(submission.value)

  return redirect(`/events/${eventId}`)
}


export const mutations = {
  makeEvent,
}