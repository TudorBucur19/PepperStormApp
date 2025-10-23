import { Route, Routes } from "react-router";

import AppLayout from "src/pages/AppLayout";
import AllRecipesPage from "src/pages/AllRecipesPage";
import RecipeDetailsPage from "src/pages/RecipeDetailsPage";
import NewRecipePage from "src/pages/NewRecipePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<AllRecipesPage />} />
        <Route path="retete/:id" element={<RecipeDetailsPage />} />
        <Route path="adaugareteta" element={<NewRecipePage />} />
      </Route>
    </Routes>
  );
}
