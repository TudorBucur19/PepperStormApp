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

import { newRecipeFormStyles as styles } from "src/components/styles/recipeForm.styles";

const NewRecipeForm = () => {
  const { addDocumentToCollection } = useDatabase(RECIPES_COLLECTION_NAME);
  const isMobile = useStore((state) => state.screen.isMobile);
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
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const payload = {
      ...data,
      createdAt: new Date(),
      author: currentUserMock,
    };
    await addDocumentToCollection(payload);
    console.log("Submitting:", payload);
    methods.reset();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Adauga o reteta noua
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
            Salvează rețeta
          </PsButton>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default NewRecipeForm;
