import { useEffect } from "react";
import { useNavigate } from "react-router";
import NewRecipeForm from "src/components/RecipeForm/NewRecipeForm";
import useAuth from "src/hooks/useAuth";

const NewRecipePage = () => {
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  }, [loggedUser, navigate]);
  return <NewRecipeForm />;
};

export default NewRecipePage;
