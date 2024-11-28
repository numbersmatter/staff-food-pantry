import { z } from 'zod';

export const ChangeStageSchema = z.object({
  eventId: z.string().min(14),
  stage: z.enum([
    "planning",
    "open-for-requests",
    "open-for-pickups",
    "event-finished",
  ]),
});
