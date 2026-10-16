import RecipesList from "src/components/RecipesList/RecipesList";
import GenericContainer from "src/components/common/GenericContainer";

const AllRecipesPage = () => {
  return (
    <GenericContainer sx={{ paddingTop: { xs: "1rem", sm: "2rem" } }}>
      <RecipesList />
    </GenericContainer>
  );
};

export default AllRecipesPage;
