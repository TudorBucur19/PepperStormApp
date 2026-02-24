import { URLS } from "src/constants/urls";
import AuthPage from "src/pages/AuthPage";
import ErrorPage from "src/pages/ErrorPage";
import IdeasPage from "src/pages/IdeasPage";
import NewRecipePage from "src/pages/NewRecipePage";
import RecipeDetailsPage from "src/pages/RecipeDetailsPage";

export const ROUTES = [
  {
    path: URLS.RECIPE_DETAILS(":id"),
    element: RecipeDetailsPage,
  },
  {
    path: URLS.ADD_RECIPE,
    element: NewRecipePage,
  },
  {
    path: URLS.EDIT_RECIPE(":id"),
    element: NewRecipePage,
  },
  {
    path: URLS.LOGIN,
    element: AuthPage,
  },
  {
    path: URLS.IDEAS,
    element: IdeasPage,
  },
  {
    path: "*",
    element: ErrorPage,
  },
];
