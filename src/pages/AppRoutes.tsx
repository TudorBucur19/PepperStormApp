import { Navigate, Route, Routes } from "react-router";

import AppLayout from "src/pages/AppLayout";
import AllRecipesPage from "src/pages/AllRecipesPage";
import { URLS } from "src/constants/urls";
import { ROUTES } from "src/constants/routes";
import { useAuthContext } from "src/hooks/AuthContext";
import LoadingPlaceholder from "src/components/common/LoadingPlaceholder";

export default function AppRoutes() {
  const { loggedUser, isAuthInitialized } = useAuthContext();

  return (
    <Routes>
      <Route path={URLS.HOME} element={<AppLayout />}>
        <Route index element={<AllRecipesPage />} />
        {ROUTES.map(({ path, element: Element, requiresAuth }) => (
          <Route
            key={path}
            path={path}
            element={
              requiresAuth && !isAuthInitialized ? (
                <LoadingPlaceholder />
              ) : requiresAuth && !loggedUser ? (
                <Navigate to={URLS.LOGIN} replace />
              ) : (
                <Element />
              )
            }
          />
        ))}
      </Route>
    </Routes>
  );
}
