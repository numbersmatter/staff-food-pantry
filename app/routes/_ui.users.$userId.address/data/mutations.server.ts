import { parseWithZod } from "@conform-to/zod";
import { AddressSchema } from "./schemas";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";
import { data, redirect } from "react-router";

interface Address {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressUpdate extends Address {
  userId: string;
}


const addressWrite = async ({
  addressUpdate,
}: {
  addressUpdate: AddressUpdate;
}) => {
  const { userId, ...address } = addressUpdate;

  return await foodPantryDb.users.update({
    id: userId,
    updateData: { address: address },
  });
};

const updateAddress = async ({
  formData,
}: {
  formData: FormData;
}) => {
  const submission = parseWithZod(formData, { schema: AddressSchema });
  if (submission.status !== "success") {
    return data(submission.reply(), { status: 400 });
  }

  const userDoc= await foodPantryDb.users.read({id: submission.value.userId})
  if(!userDoc){
    
    await foodPantryDb.users.create({
      userId: submission.value.userId,
      language: "en",
      email: submission.value.email,
    });
  }


  await addressWrite({ addressUpdate: submission.value });

 
  return redirect(`/users/${submission.value.userId}`);
};

export const mutations = { updateAddress };
