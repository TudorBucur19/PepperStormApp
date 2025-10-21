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

export interface IRecipe {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  recipeIngredients: IIngredient[];
  preparationTime: number;
  prepSteps: string;
  title: string;
  specialTag: string[];
  imageURL: ImageURL[];
  servings: number;
  category: string;
  author: RecipeAuthor;
}

export interface IDbRecipe {
  id: string;
  recipe: IRecipe;
}

export type ImageURL = {
  name: string;
  url: string;
};
