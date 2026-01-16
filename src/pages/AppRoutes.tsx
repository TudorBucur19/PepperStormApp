import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";

import AppLayout from "src/pages/AppLayout";
import AllRecipesPage from "src/pages/AllRecipesPage";
import RecipeDetailsPage from "src/pages/RecipeDetailsPage";
import NewRecipePage from "src/pages/NewRecipePage";
import AuthPage from "src/pages/AuthPage";
import { useStore } from "src/store/rootStore";

export default function AppRoutes() {
  const loggedUser = useStore((state) => state.loggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) navigate("/login");
  }, [loggedUser, navigate]);

  return (
    <Routes>
      <Route path="/" element={loggedUser ? <AppLayout /> : null}>
        <Route index element={<AllRecipesPage />} />
        <Route path="retete/:id" element={<RecipeDetailsPage />} />
        <Route path="adaugareteta" element={<NewRecipePage />} />
        <Route path="login" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}
