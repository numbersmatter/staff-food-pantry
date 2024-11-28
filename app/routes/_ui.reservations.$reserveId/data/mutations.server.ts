import { foodPantryDb } from "~/services/databases/food-pantry-db.server";
import { ApproveReservaitonSchema } from "./schemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "react-router";

const approveReservation = async ({ formData }: { formData: FormData }) => {
  const submission = parseWithZod(formData, {
    schema: ApproveReservaitonSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  await foodPantryDb.reservations.update({
    id: submission.value.reservationId,
    data: {
      status: "approved",
    },
  });

  return redirect(`/events/${submission.value.eventId}`);
};

export const mutations = { approveReservation };
