import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import PsButton from "src/components/common/PsButton";
import { LibraryAddOutlinedIcon } from "src/components/icons";
import IdeaFormFields from "src/components/Ideas/IdeaFormFields";
import { IDEAS_COLLECTION_NAME } from "src/constants/appConfigValues";
import { useAuthContext } from "src/hooks/AuthContext";
import useDatabase from "src/hooks/useDatabase";
import { newIdeaSchema, NewIdeaValues } from "src/schemas/ideasSchemas";
import { useStore } from "src/store/rootStore";
import { pickDirtyFields } from "src/utils/helpers";
import { IRecipeIdea } from "src/types/ideas";

const EMPTY_IDEA_VALUES: NewIdeaValues = {
  title: "",
  description: "",
  campingFriendly: false,
  imageURL: [],
};

const NewIdeaForm = () => {
  const { addIdeaToCollection, getIdeasCollectionData } = useDatabase(
    IDEAS_COLLECTION_NAME,
  );
  const { loggedUser: currentUser } = useAuthContext();
  const { updateDocument } = useDatabase(IDEAS_COLLECTION_NAME);
  const isLoading = useStore((state) => state.apiCallStatus.isLoading);
  const editedIdea = useStore((state) => state.editingIdea);
  const setEditingIdea = useStore((state) => state.setEditingIdea);
  const methods = useForm<NewIdeaValues>({
    resolver: zodResolver(newIdeaSchema),
    defaultValues: EMPTY_IDEA_VALUES,
    mode: "onBlur",
  });
  const dirtyFields = methods.formState.dirtyFields;
  const isSubmitting = methods.formState.isSubmitting;

  const formTitle = editedIdea
    ? `Editează ideea ${editedIdea.idea.title.toUpperCase()}`
    : "Adaugă o idee";

  const submitButtonText = editedIdea
    ? "Salvează modificările"
    : "Adaugă în lista de idei";

  const onSubmit: SubmitHandler<NewIdeaValues> = async (
    data: NewIdeaValues,
  ) => {
    if (editedIdea) {
      const updatedFields = pickDirtyFields<NewIdeaValues>(
        data,
        dirtyFields as Partial<Record<keyof NewIdeaValues, boolean>>,
      );
      console.log("updated fields idea", dirtyFields);

      await updateDocument<IRecipeIdea>(editedIdea.id, updatedFields);
      await getIdeasCollectionData();
      setEditingIdea(null);
      methods.reset(EMPTY_IDEA_VALUES);

      return;
    }

    const updatedAuthor = {
      userID: currentUser?.userID || "",
      displayName: currentUser?.displayName || "",
      photoURL: currentUser?.photoURL || "",
    };
    const payload = {
      ...data,
      description: data.description ?? "",
      createdAt: new Date(),
      author: updatedAuthor,
    };
    console.log("Submitting:", payload);
    await addIdeaToCollection(payload);
    await getIdeasCollectionData();
    methods.reset(EMPTY_IDEA_VALUES);
  };

  useEffect(() => {
    if (editedIdea) {
      const { title, description, campingFriendly, imageURL } = editedIdea.idea;
      methods.reset({
        title,
        description,
        campingFriendly,
        imageURL,
      });
      return;
    }

    methods.reset(EMPTY_IDEA_VALUES);
  }, [editedIdea, methods]);

  useEffect(() => {
    // Cleanup function to reset form and clear editing idea when component unmounts
    return () => {
      methods.reset(EMPTY_IDEA_VALUES);
      setEditingIdea(null);
    };
  }, [methods, setEditingIdea]);

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        width="100%"
        alignItems="center"
        spacing={2}
      >
        <Divider orientation="horizontal" flexItem />
        <Typography variant="h5" color="#254a5d">
          {formTitle}
        </Typography>
        <IdeaFormFields />
        <PsButton
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting || isLoading}
          isLoading={isSubmitting}
          startIcon={<LibraryAddOutlinedIcon />}
        >
          {submitButtonText}
        </PsButton>
      </Stack>
    </FormProvider>
  );
};

export default NewIdeaForm;
