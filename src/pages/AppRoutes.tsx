import { Route, Routes } from "react-router";

import AppLayout from "src/pages/AppLayout";
import DisplayRecipe from "src/pages/DisplayRecipe";
import AllRecipesPage from "src/pages/AllRecipesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<AllRecipesPage />} />
        <Route path="retete/:id" element={<DisplayRecipe />} />
      </Route>
    </Routes>
  );
}
