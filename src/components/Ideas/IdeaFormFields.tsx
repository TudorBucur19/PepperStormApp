import { Controller, useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import FileUploadField from "src/components/RecipeForm/FileUploadField";
import { IDEAS_PHOTOS_COLLECTION_NAME } from "src/constants/appConfigValues";
import { NewIdeaValues } from "src/schemas/ideasSchemas";

const IdeaFormFields = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NewIdeaValues>();

  return (
    <Stack spacing={2} width={{ xs: "100%", md: "100%" }} paddingTop="1rem">
      <TextField
        label="Titlu"
        fullWidth
        required
        slotProps={{ inputLabel: { shrink: true } }}
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
        slotProps={{ inputLabel: { shrink: true } }}
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
      <Controller
        name="campingFriendly"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!field.value}
                onChange={(event) => field.onChange(event.target.checked)}
              />
            }
            label="Camping friendly"
          />
        )}
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
