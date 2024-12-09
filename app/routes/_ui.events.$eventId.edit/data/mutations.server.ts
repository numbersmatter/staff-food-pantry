import { parseWithZod } from "@conform-to/zod";
import { redirect } from "react-router";
import { AddPickupTime, ChangeStageSchema, RemovePickupTime } from "./schemas";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";
import { SunMedium } from "lucide-react";
import { convertTo12Hour } from "~/lib/utils";

const changeStage = async ({ formData }: { formData: FormData }) => {
  const submission = parseWithZod(formData, {
    schema: ChangeStageSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  await foodPantryDb.events.update({
    id: submission.value.eventId,
    data: {
      stage: submission.value.stage,
    },
  });

  return redirect(`/events/${submission.value.eventId}`);
};

const addPickupTime = async({formData}: {formData:FormData})=>{
  const submission = parseWithZod(formData, {
    schema: AddPickupTime
  })

  if(submission.status !== "success"){
    return submission.reply()
  }
 
  const { time, eventId } = submission.value

  const timeWithOutColon = time.replace(':', '');

  const timeNumber = Number(timeWithOutColon);

  const timeReadValue =  convertTo12Hour(timeNumber);

  const updateData ={
    [`timeSlots.${timeWithOutColon}`]:timeReadValue
  }

  await foodPantryDb.events.update({
    id: eventId,
    data: updateData
  })

  return redirect(`/events/${eventId}/edit`)
}

const removePickupTime= async({formData}:{formData:FormData})=>{
  const submission = parseWithZod(formData,{
    schema:RemovePickupTime
  })

  if(submission.status !== "success"){
    return submission.reply();
  }

  const { eventId, timeId } = submission.value;

  const eventDoc = await foodPantryDb.events.read({eventId});

  if(!eventDoc){
    throw new Response("Event Not Found", { status: 404})
  }

  const timeSlots = eventDoc.timeSlots;
  
  const newTimeSlots = Object.fromEntries(
    Object.entries(timeSlots).filter(([key])=>key!==timeId)
  );

  await foodPantryDb.events.update({
    id:eventId,
    data:{
      timeSlots:newTimeSlots
    }
  })
 


}

export const mutations = { 
  changeStage, 
  addPickupTime, 
  removePickupTime 
};

