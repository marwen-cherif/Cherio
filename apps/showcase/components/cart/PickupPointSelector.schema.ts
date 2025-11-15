import { z } from 'zod';

export const pickupPointSearchSchema = z.object({
  searchAddress: z.string().optional(),
});

export type PickupPointSearchData = z.infer<typeof pickupPointSearchSchema>;

