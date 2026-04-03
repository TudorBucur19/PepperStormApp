import { z } from "zod";

export const listItemSchema = z.object({
  listItem: z
    .string()
    .trim()
    .min(1, "Completează un to-do înainte să-l adaugi"),
});

export const shareListSchema = z.object({
  shareEmail: z
    .email("Completează o adresă de email validă")
    .nonempty("Completează o adresă de email"),
});

export type ListItemValues = z.infer<typeof listItemSchema>;
export type ShareListValues = z.infer<typeof shareListSchema>;
