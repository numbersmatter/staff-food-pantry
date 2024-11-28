import { z } from "zod";

export const ChangeApplicationStatusSchema = z.object({
  newStatus: z.enum(["pending", "accepted", "declined"]),
  applicationId: z.string().min(14),
});
