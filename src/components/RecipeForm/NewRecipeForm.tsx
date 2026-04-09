import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import DetailsForm from "src/components/RecipeForm/DetailsForm";
import IngredientsSection from "src/components/RecipeForm/IngredientsSection";
import PsButton from "src/components/common/PsButton";
import LoadingPlaceholder from "src/components/common/LoadingPlaceholder";
import ErrorFallback from "src/components/common/ErrorFallback";
import { FormValues, recipeDetailsSchema } from "src/schemas/newRecipeSchemas";
import useRecipesDatabase from "src/hooks/useRecipesDatabase";
import useSettingsDatabase from "src/hooks/useSettingsDatabase";
import { APP_SETTINGS, QUERY_KEYS } from "src/constants/appConfigValues";
import { LibraryAddOutlinedIcon } from "src/components/icons";
import { useStore } from "src/store/rootStore";
import { useAuthContext } from "src/hooks/AuthContext";
import { URLS } from "src/constants/urls";
import PageTitle from "src/components/common/PageTitle";
import { IDbRecipe, IRecipe } from "src/types/recipes";
import { pickDirtyFields } from "src/utils/helpers";
import { DEFAULT_RECIPE_VALUES } from "src/constants/formsValues";

import { newRecipeFormStyles as styles } from "src/components/styles/recipeForm.styles";

const NewRecipeForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setDisplayedRecipe = useStore((s) => s.setDisplayedRecipe);
  const isMobile = useStore((state) => state.screen.isMobile);
  const displayedRecipe = useStore((state) => state.displayedRecipe);
  const defaultCategories = useStore((s) => s.appSettings.categories);
  const { addRecipeToCollection, updateRecipe } = useRecipesDatabase();
  const { appSettingsQuery, updateSettingsCollectionData } =
    useSettingsDatabase();
  const { loggedUser: currentUser } = useAuthContext();
  const isEditMode = globalThis.location.pathname
    .split("/")
    .includes("modifica-reteta");
  const submitLabel = isEditMode ? "Salvează modificările" : "Salvează rețeta";
  const formTitle = isEditMode
    ? `Modifică rețeta  ${displayedRecipe?.recipe.title || ""}`
    : "Adaugă o rețetă nouă";

  const createRecipeMutation = useMutation({
    mutationFn: addRecipeToCollection,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ALL_RECIPES_QUERY_KEY,
      });
      methods.reset();
      navigate(URLS.HOME);
    },
  });

  const updateRecipeMutation = useMutation({
    mutationFn: ({
      recipeId,
      payload,
    }: {
      recipeId: string;
      payload: Partial<IRecipe>;
    }) => updateRecipe(recipeId, payload),
    onSuccess: async (_, variables) => {
      queryClient.setQueryData<IDbRecipe[]>(
        QUERY_KEYS.ALL_RECIPES_QUERY_KEY,
        (currentRecipes) => {
          if (!currentRecipes) {
            return currentRecipes;
          }

          return currentRecipes.map((recipe) =>
            recipe.id === variables.recipeId
              ? {
                  ...recipe,
                  recipe: {
                    ...recipe.recipe,
                    ...variables.payload,
                  },
                }
              : recipe,
          );
        },
      );

      navigate(`${URLS.RECIPE_DETAILS(variables.recipeId)}`);
    },
  });
  const isSubmitting =
    createRecipeMutation.isPending || updateRecipeMutation.isPending;
  const isSettingsLoading = appSettingsQuery.isLoading;
  const hasSettingsError = appSettingsQuery.isError;

  const methods = useForm<FormValues>({
    resolver: zodResolver(recipeDetailsSchema),
    defaultValues: DEFAULT_RECIPE_VALUES,
    mode: "onBlur",
  });
  const dirtyFields = methods.formState.dirtyFields;

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

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const recipeCategory = data.category;
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

    if (
      recipeCategory &&
      dirtyFields.category &&
      !defaultCategories.includes(recipeCategory)
    ) {
      await updateSettingsCollectionData(
        APP_SETTINGS.CATEGORIES,
        data.category,
      );
    }

    if (isEditMode) {
      const payload = pickDirtyFields<FormValues>(
        data,
        dirtyFields as Partial<Record<keyof FormValues, boolean>>,
      ) as Partial<IRecipe>;

      if (!Object.keys(payload).length) {
        navigate(URLS.RECIPE_DETAILS(displayedRecipe?.id || ""));
        return;
      }

      await updateRecipeMutation.mutateAsync({
        recipeId: displayedRecipe?.id || "",
        payload,
      });
      return;
    }

    await createRecipeMutation.mutateAsync(payload);
  };

  if (isSettingsLoading) return <LoadingPlaceholder />;
  if (hasSettingsError) {
    return <ErrorFallback errorMessage="Error fetching app settings" />;
  }

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
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {submitLabel}
          </PsButton>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default NewRecipeForm;
