import { parseWithZod } from "@conform-to/zod"
import { AddStudentSchema } from "./schemas"
import { foodPantryDb } from "~/services/databases/food-pantry-db.server"
import { redirect } from "react-router"

const addStudent= async({
  formData, userId
}:{
  formData: FormData, 
  userId: string
})=>{

  const submission = parseWithZod(formData, { schema: AddStudentSchema})
  if( submission.status !== "success"){
    return submission.reply()
  }

  await foodPantryDb.users.addStudent({
    userId,
    student: submission.value
  })

  return redirect(`/users/${userId}/students`)
}

export const mutations = {addStudent}
