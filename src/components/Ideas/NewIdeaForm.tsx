import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";

import PsButton from "src/components/common/PsButton";
import { LibraryAddOutlinedIcon } from "src/components/icons";
import IdeaFormFields from "src/components/Ideas/IdeaFormFields";
import { IDEAS_COLLECTION_NAME } from "src/constants/appConfigValues";
import { useAuthContext } from "src/hooks/AuthContext";
import useDatabase from "src/hooks/useDatabase";
import { newIdeaSchema, NewIdeaValues } from "src/schemas/ideasSchemas";
import { useStore } from "src/store/rootStore";

const NewIdeaForm = () => {
  const { addIdeaToCollection, getIdeasCollectionData } = useDatabase(
    IDEAS_COLLECTION_NAME,
  );
  const { loggedUser: currentUser } = useAuthContext();
  const isLoading = useStore((state) => state.apiCallStatus.isLoading);
  const methods = useForm<NewIdeaValues>({
    resolver: zodResolver(newIdeaSchema),
    defaultValues: {
      title: "",
      description: "",
      campingFriendly: false,
      imageURL: [],
    },
    mode: "onBlur",
  });
  const isSubmitting = methods.formState.isSubmitting;

  const onSubmit: SubmitHandler<NewIdeaValues> = async (
    data: NewIdeaValues,
  ) => {
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
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        width="100%"
        alignItems="center"
        spacing={2}
      >
        <IdeaFormFields />
        <PsButton
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting || isLoading}
          isLoading={isSubmitting}
          startIcon={<LibraryAddOutlinedIcon />}
        >
          Adaugă în lista de idei
        </PsButton>
      </Stack>
    </FormProvider>
  );
};

export default NewIdeaForm;
