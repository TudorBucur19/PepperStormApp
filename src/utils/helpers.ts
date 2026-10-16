import { RecipeFiltersState } from "src/types/components";
import { IDbRecipe } from "src/types/recipes";

export const capitalizeString = (string: string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export const reorderList = <T>(list: T[], elementIndex: number) => {
  const editableList = [...list];
  const firstElement = editableList.splice(elementIndex, 1);
  editableList.splice(0, 0, ...firstElement);

  return editableList;
};

export const pickDirtyFields = <T extends Record<string, unknown>>(
  values: T,
  dirty: Partial<Record<keyof T, boolean | Partial<Record<string, unknown>>>>,
): Partial<T> => {
  const out: Partial<T> = {};
  for (const key of Object.keys(dirty ?? {})) {
    if (!dirty[key]) continue;

    // nested objects/arrays will usually be `true` or nested dirty maps
    out[key as keyof T] = values[key as keyof T];
  }
  return out;
};

export const getRecipeTags = (specialTag: unknown): string[] => {
  if (Array.isArray(specialTag)) {
    return specialTag.filter((tag): tag is string => typeof tag === "string");
  }

  return typeof specialTag === "string" ? [specialTag] : [];
};

export const filterRecipes = (
  recipes: IDbRecipe[],
  filters: RecipeFiltersState,
) =>
  recipes.filter(({ recipe }) => {
    const normalizedCategory = recipe.category.trim().toLowerCase();
    const selectedCategory = filters.category.trim().toLowerCase();
    const matchesCategory =
      !selectedCategory || normalizedCategory === selectedCategory;
    const matchesAuthor =
      !filters.authorId || recipe.author.userID === filters.authorId;
    const normalizedTags = new Set(
      getRecipeTags(recipe.specialTag).map((tag) => tag.trim().toLowerCase()),
    );
    const matchesSpecialTags =
      filters.specialTags.length === 0 ||
      filters.specialTags.some((tag) =>
        normalizedTags.has(tag.trim().toLowerCase()),
      );

    return matchesCategory && matchesAuthor && matchesSpecialTags;
  });
