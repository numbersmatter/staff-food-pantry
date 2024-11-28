import { parseWithZod } from "@conform-to/zod";
import { redirect } from "react-router";
import { ChangeStageSchema } from "./schemas";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

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

export const mutations = { changeStage };

