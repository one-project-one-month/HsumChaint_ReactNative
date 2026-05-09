import { z } from "zod";

export const spaceSchema = z.object({
  name: z.string().min(1, "Monastery name is required"),
  address: z.string().min(1, "Address is required"),
  email: z.union([z.literal(""), z.email().optional()]),
  phones: z
    .array(
      z.object({
        value: z.string().min(1, "Phone number is required"),
      }),
    )
    .min(1, "At least one phone number is")
    .max(4),
});

export type SpaceSchema = z.infer<typeof spaceSchema>;
