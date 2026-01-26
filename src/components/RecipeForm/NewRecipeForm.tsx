import { useEffect } from "react";
import { useNavigate } from "react-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Box, Typography } from "@mui/material";

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
import useAuth from "src/hooks/useAuth";
import { URLS } from "src/constants/urls";

import { newRecipeFormStyles as styles } from "src/components/styles/recipeForm.styles";

const NewRecipeForm = () => {
  const navigate = useNavigate();
  const setDisplayedRecipe = useStore((s) => s.setDisplayedRecipe);
  const isMobile = useStore((state) => state.screen.isMobile);
  const displayedRecipe = useStore((state) => state.displayedRecipe);
  const { addDocumentToCollection, updateDocument } = useDatabase(
    RECIPES_COLLECTION_NAME,
  );
  const currentUser = useAuth().loggedUser;
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
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!displayedRecipe) return;
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
    });
  }, [displayedRecipe, methods]);

  useEffect(() => {
    return () => {
      setDisplayedRecipe(null);
    };
  }, []);

  const dirtyFields = methods.formState.dirtyFields;
  console.log("DIRTYF", dirtyFields);

  console.log("FORM STATE", methods.getValues());
  console.log("FORM STATE", methods.getValues());
  console.log("REDUX STATE", displayedRecipe?.recipe);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const payload = {
      ...data,
      createdAt: new Date(),
      author: currentUser ?? currentUserMock, // fallback to a default RecipeAuthor object
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

      await updateDocument(displayedRecipe?.id || "", payload);
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
      <Typography variant="h4" gutterBottom>
        {formTitle}
      </Typography>
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
