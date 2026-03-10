import { z } from "zod";

export const newIdeaSchema = z.object({
  title: z
    .string()
    .min(1, "Titlul este obligatoriu")
    .max(35, "Titlul nu poate depăși 35 de caractere"),
  description: z.string().optional(),
  campingFriendly: z.boolean(),
  imageURL: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    }),
  ),
});

export type NewIdeaValues = z.infer<typeof newIdeaSchema>;
