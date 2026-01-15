import { Controller, useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import { recipeCategories, specialTags } from "src/constants/appConfigValues";
import FileUploadField from "src/components/RecipeForm/FileUploadField";

const DetailsForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Detaliile rețetei</Typography>
      <TextField
        label="Titlu"
        fullWidth
        required
        {...register("title")}
        error={!!errors.title}
        helperText={
          typeof errors.title?.message === "string"
            ? errors.title.message
            : undefined
        }
      />
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Categorie</InputLabel>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Categorie"
              fullWidth
              required
              error={!!errors.category}
              {...field}
            >
              {recipeCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <TextField
        label="Porții"
        type="number"
        fullWidth
        required
        onWheel={(e) => (e.target as HTMLInputElement).blur()} // prevent scroll-change
        {...register("servings", {
          valueAsNumber: true,
          setValueAs: (v) => (v === "" || v == null ? undefined : Number(v)),
        })}
        error={!!errors.servings}
        helperText={
          typeof errors.servings?.message === "string"
            ? errors.servings.message
            : undefined
        }
      />

      <TextField
        label="Timp de preparare (minute)"
        type="number"
        fullWidth
        required
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        {...register("prepMinutes", {
          valueAsNumber: true,
          setValueAs: (v) => (v === "" || v == null ? undefined : Number(v)),
        })}
        error={!!errors.prepMinutes}
        helperText={
          typeof errors.prepMinutes?.message === "string"
            ? errors.prepMinutes.message
            : undefined
        }
      />
      {/* Extracted handler to avoid deep nesting */}
      <Controller
        name="specialTags"
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const handleTagChange =
            (tag: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                field.onChange([...field.value, tag]);
              } else {
                field.onChange(field.value.filter((t: string) => t !== tag));
              }
            };

          return (
            <FormGroup row>
              {specialTags.map((tag) => (
                <FormControlLabel
                  key={tag}
                  control={
                    <Checkbox
                      checked={field.value.includes(tag)}
                      onChange={handleTagChange(tag)}
                    />
                  }
                  label={tag}
                />
              ))}
            </FormGroup>
          );
        }}
      />

      <TextField
        label="Instrucțiuni"
        multiline
        rows={4}
        fullWidth
        required
        {...register("prepSteps")}
        error={!!errors.prepSteps}
        helperText={
          typeof errors.prepSteps?.message === "string"
            ? errors.prepSteps.message
            : undefined
        }
      />

      <TextField
        label="Condimente"
        fullWidth
        {...register("spices")}
        error={!!errors.spices}
        helperText={
          typeof errors.spices?.message === "string"
            ? errors.spices.message
            : undefined
        }
      />
      <FileUploadField />
    </Stack>
  );
};

export default DetailsForm;
