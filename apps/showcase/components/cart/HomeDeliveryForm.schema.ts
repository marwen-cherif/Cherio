import { z } from 'zod';
import { DeliveryAddress } from '@shared/index';

export const homeDeliveryFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  department: z.string().optional(),
  additionalInfo: z.string().optional(),
}) satisfies z.ZodType<DeliveryAddress>;

export type HomeDeliveryFormData = z.infer<typeof homeDeliveryFormSchema>;

