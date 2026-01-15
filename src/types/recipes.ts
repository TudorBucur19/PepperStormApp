export type IIngredient = {
  ingredient: string;
  quantity: string;
  measure: string;
};

export type RecipeAuthor = {
  displayName: string;
  photoURL: string;
  userID: string;
};

export type CreatedAtSeconds = {
  seconds: number;
  nanoseconds: number;
};

export interface IRecipe {
  createdAt: Date | CreatedAtSeconds;
  recipeIngredients: IIngredient[];
  preparationTime: number;
  prepSteps: string;
  title: string;
  specialTag: string[];
  imageURL: ImageURL[];
  servings: number;
  category: string;
  author: RecipeAuthor;
  spices?: string;
}

export interface IDbRecipe {
  id: string;
  recipe: IRecipe;
}

export type ImageURL = {
  name: string;
  url: string;
};
