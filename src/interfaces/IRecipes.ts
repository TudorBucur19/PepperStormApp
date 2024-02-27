 export type Ingredient = {
    ingredient: string;
    quantity: string;
    measure: string;
}

export type RecipeAuthor = {
    displayName: string;
    photoURL: string;
    userID: string;
}

export interface IRecipe {
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
    recipeIngredients: Ingredient[];
    preparationTime: number;
    prepSteps: string;
    title: string;
    specialTag: string[];
    imageURL: string[];
    servings: number;
    category: string;
    author: RecipeAuthor;
}

export interface IDbRecipe {
    id: string;
    recipe: IRecipe; 
}


