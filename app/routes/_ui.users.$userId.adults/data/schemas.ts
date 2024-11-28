import { z } from 'zod';

export const UpdateAdultsSchema = z.object({
  adults: z.coerce.number()
});