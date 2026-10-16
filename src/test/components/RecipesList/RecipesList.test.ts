import { describe, expect, it } from "vitest";

import { filterRecipes } from "src/utils/helpers";
import { IDbRecipe } from "src/types/recipes";

const recipes: IDbRecipe[] = [
  {
    id: "one",
    recipe: {
      category: "Cină",
      specialTag: ["Rapid", "Vegetarian"],
      author: { userID: "author-one", displayName: "Ana", photoURL: "" },
    } as IDbRecipe["recipe"],
  },
  {
    id: "two",
    recipe: {
      category: "Desert",
      specialTag: ["Vegetarian"],
      author: { userID: "author-two", displayName: "Dan", photoURL: "" },
    } as IDbRecipe["recipe"],
  },
];

describe("filterRecipes", () => {
  it("matches category, author, and tags together", () => {
    expect(
      filterRecipes(recipes, {
        category: "cină",
        authorId: "author-one",
        specialTags: ["rapid"],
      }).map(({ id }) => id),
    ).toEqual(["one"]);

    expect(
      filterRecipes(recipes, {
        category: "cină",
        authorId: "author-two",
        specialTags: [],
      }),
    ).toEqual([]);
  });

  it("matches any selected special tag", () => {
    expect(
      filterRecipes(recipes, {
        category: "",
        authorId: "",
        specialTags: ["rapid", "vegetarian"],
      }).map(({ id }) => id),
    ).toEqual(["one", "two"]);
  });

  it("ignores legacy false special-tag values", () => {
    const recipeWithoutTags = {
      ...recipes[0],
      recipe: { ...recipes[0].recipe, specialTag: false },
    } as unknown as IDbRecipe;

    expect(
      filterRecipes([recipeWithoutTags], {
        category: "",
        authorId: "",
        specialTags: [],
      }),
    ).toEqual([recipeWithoutTags]);
  });
});
