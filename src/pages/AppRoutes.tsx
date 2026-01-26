import { Route, Routes } from "react-router";

import AppLayout from "src/pages/AppLayout";
import AllRecipesPage from "src/pages/AllRecipesPage";
import { URLS } from "src/constants/urls";
import { ROUTES } from "src/constants/routes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={URLS.HOME} element={<AppLayout />}>
        <Route index element={<AllRecipesPage />} />
        {ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>
    </Routes>
  );
}
