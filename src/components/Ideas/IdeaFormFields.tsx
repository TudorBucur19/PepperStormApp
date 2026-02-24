import { useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import FileUploadField from "src/components/RecipeForm/FileUploadField";
import { IDEAS_PHOTOS_COLLECTION_NAME } from "src/constants/appConfigValues";

const IdeaFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={2} width={{ xs: "100%", md: "100%" }} paddingTop="1rem">
      <Divider orientation="horizontal" flexItem />
      <Typography variant="h5">Adaugă o idee</Typography>
      <TextField
        label="Titlu"
        fullWidth
        required
        {...register("title", {
          setValueAs: (v) => (typeof v === "string" ? v.toLowerCase() : v),
        })}
        error={!!errors.title}
        helperText={
          typeof errors.title?.message === "string"
            ? errors.title.message
            : undefined
        }
      />
      <TextField
        label="Detalii"
        multiline
        minRows={2}
        fullWidth
        {...register("description")}
        error={!!errors.description}
        helperText={
          typeof errors.description?.message === "string"
            ? errors.description.message
            : undefined
        }
        sx={{
          "& .MuiInputBase-inputMultiline": {
            resize: "vertical",
          },
        }}
      />
      <FileUploadField
        fileCollectionName={IDEAS_PHOTOS_COLLECTION_NAME}
        formFieldName="imageURL"
        allowMultiple={false}
      />
    </Stack>
  );
};

export default IdeaFormFields;
