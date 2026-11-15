import { z } from "zod";

import { addressSchema, personNameSchema, phoneSchema } from "@/lib/validation";

/** UC-DT-01 1a: staff enter the customer's name and normalized phone, then each meal's place. */
export const onBehalfSchema = z.object({
  customerPhone: phoneSchema,
  customerName: personNameSchema,
  address: addressSchema,
});

export type OnBehalfFields = z.input<typeof onBehalfSchema>;
