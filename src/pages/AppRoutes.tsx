import { Route, Routes } from "react-router";

import AppLayout from "src/pages/AppLayout";
import AllRecipesPage from "src/pages/AllRecipesPage";
import RecipeDetailsPage from "src/pages/RecipeDetailsPage";
import NewRecipePage from "src/pages/NewRecipePage";
import AuthPage from "src/pages/AuthPage";

export default function AppRoutes() {
  // const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser") || "null");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedUser) navigate("/login");
  // }, [loggedUser, navigate]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<AllRecipesPage />} />
        <Route path="retete/:id" element={<RecipeDetailsPage />} />
        <Route path="adauga-reteta" element={<NewRecipePage />} />
        <Route path="modifica-reteta/:id" element={<NewRecipePage />} />
        <Route path="login" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}
