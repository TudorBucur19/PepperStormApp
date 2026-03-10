import { useEffect } from "react";
import { useNavigate } from "react-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import DetailsForm from "src/components/RecipeForm/DetailsForm";
import IngredientsSection from "src/components/RecipeForm/IngredientsSection";
import PsButton from "src/components/common/PsButton";
import { FormValues, recipeDetailsSchema } from "src/schemas/newRecipeSchemas";
import { currentUserMock } from "src/mocks/userMock";
import useDatabase from "src/hooks/useDatabase";
import { RECIPES_COLLECTION_NAME } from "src/constants/appConfigValues";
import { LibraryAddOutlinedIcon } from "src/components/icons";
import { useStore } from "src/store/rootStore";
import { pickDirtyFields } from "src/utils/helpers";
import { useAuthContext } from "src/hooks/AuthContext";
import { URLS } from "src/constants/urls";
import PageTitle from "src/components/common/PageTitle";
import { IRecipe } from "src/types/recipes";

import { newRecipeFormStyles as styles } from "src/components/styles/recipeForm.styles";

const NewRecipeForm = () => {
  const navigate = useNavigate();
  const setDisplayedRecipe = useStore((s) => s.setDisplayedRecipe);
  const isMobile = useStore((state) => state.screen.isMobile);
  const displayedRecipe = useStore((state) => state.displayedRecipe);
  const { addDocumentToCollection, updateDocument } = useDatabase(
    RECIPES_COLLECTION_NAME,
  );
  const { loggedUser: currentUser } = useAuthContext();
  const isEditMode = globalThis.location.pathname
    .split("/")
    .includes("modifica-reteta");
  const submitLabel = isEditMode ? "Salvează modificările" : "Salvează rețeta";
  const formTitle = isEditMode
    ? `Modifică rețeta  ${displayedRecipe?.recipe.title || ""}`
    : "Adaugă o rețetă nouă";

  const methods = useForm<FormValues>({
    resolver: zodResolver(recipeDetailsSchema),
    defaultValues: {
      title: "",
      category: "",
      servings: 1,
      preparationTime: 10,
      prepSteps: "",
      recipeIngredients: [],
      specialTag: [],
      imageURL: [],
      complexity: "medium",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!displayedRecipe || !isEditMode) return;
    const {
      title,
      category,
      servings,
      preparationTime,
      prepSteps,
      spices,
      specialTag,
      recipeIngredients,
      imageURL,
      complexity,
    } = displayedRecipe.recipe;

    methods.reset({
      title: title ?? "",
      category: category ?? "",
      servings: servings ?? 1,
      preparationTime: preparationTime ?? 1,
      prepSteps: prepSteps ?? "",
      spices: spices ?? "",
      specialTag: specialTag || [],
      recipeIngredients: recipeIngredients ?? [],
      imageURL: imageURL ?? [],
      complexity: complexity || "medium",
    });
  }, [displayedRecipe, methods, isEditMode]);

  useEffect(() => {
    return () => {
      setDisplayedRecipe(null);
    };
  }, [setDisplayedRecipe]);

  const dirtyFields = methods.formState.dirtyFields;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const updatedAuthor = {
      userID: currentUser?.userID || "",
      displayName: currentUser?.displayName || "",
      photoURL: currentUser?.photoURL || "",
    };
    const payload = {
      ...data,
      createdAt: new Date(),
      author: updatedAuthor,
    };
    if (isEditMode) {
      const updatedFields = pickDirtyFields<FormValues>(
        data,
        dirtyFields as Partial<Record<keyof FormValues, boolean>>,
      );
      console.log("DIRTY IN UPDATE", updatedFields);
      const payload = {
        ...data,
        createdAt: displayedRecipe?.recipe.createdAt || new Date(),
        author: displayedRecipe?.recipe.author || currentUserMock,
      };

      await updateDocument<IRecipe>(displayedRecipe?.id || "", payload);
      navigate(`${URLS.RECIPE_DETAILS(displayedRecipe?.id || "")}`);
      return;
    }

    await addDocumentToCollection(payload);
    console.log("Submitting:", payload);
    methods.reset();
    navigate(URLS.HOME);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageTitle>{formTitle}</PageTitle>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          autoComplete="on"
        >
          <Box sx={styles.formContainer}>
            <DetailsForm />
            <IngredientsSection />
          </Box>
          <PsButton
            type="submit"
            color="primary"
            variant="contained"
            startIcon={<LibraryAddOutlinedIcon />}
            fullWidth={isMobile}
          >
            {submitLabel}
          </PsButton>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default NewRecipeForm;
