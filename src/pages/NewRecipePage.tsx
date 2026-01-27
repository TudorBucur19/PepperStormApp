import { useEffect } from "react";
import { useNavigate } from "react-router";

import NewRecipeForm from "src/components/RecipeForm/NewRecipeForm";
import { useAuthContext } from "src/hooks/AuthContext";

const NewRecipePage = () => {
  const { loggedUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  }, [loggedUser, navigate]);

  return <NewRecipeForm />;
};

export default NewRecipePage;
