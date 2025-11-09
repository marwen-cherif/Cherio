import {z} from "zod";

export const cartSchema = z.object({
    hasItems: z.boolean().refine((val) => val === true, {
        message: 'Cart must contain at least one item',
    }),
});
