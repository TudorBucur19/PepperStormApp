import { z } from "zod";

export const newIdeaSchema = z.object({
  title: z.string().min(1, "Titlul este obligatoriu"),
  description: z.string().optional(),
  imageURL: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    }),
  ),
});

export type NewIdeaValues = z.infer<typeof newIdeaSchema>;
