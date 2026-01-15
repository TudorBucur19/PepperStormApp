import { z } from "zod";

export const ingredientSchema = z.object({
  ingredient: z.string().min(1, "Numele ingredientului este obligatoriu"),
  quantity: z.string().min(1, "Cantitatea este obligatorie"),
  measure: z
    .string()
    .min(1, "Selectează unitatea de măsură")
    .refine((v) => v !== "", { message: "Selectează unitatea de măsură" }),
});

export const recipeDetailsSchema = z.object({
  title: z.string().min(2, "Titlul este prea scurt"),
  category: z
    .string()
    .min(1, "Selectează o categorie")
    .refine((value) => value !== "", {
      message: "Selectează o categorie",
    }),
  servings: z.number().int().min(1, "Minim 1 porție"),
  preparationTime: z.number().int().min(1, "Minim 1 minut"),
  prepSteps: z.string().min(5, "Adaugă instrucțiuni"),
  spices: z.string().min(2, "Adaugă condimente").optional(),
  recipeIngredients: z
    .array(ingredientSchema)
    .min(1, "Adaugă cel puțin un ingredient"),
  specialTag: z.array(z.string()),
  imageURL: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

export type FormValues = z.infer<typeof recipeDetailsSchema>;
