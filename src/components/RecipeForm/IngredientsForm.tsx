import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PsButton from "src/components/common/PsButton";

import { IIngredientsForm } from "src/types/components";
import { measures } from "src/constants/appConfigValues";
import { DeleteOutlinedIcon } from "src/components/icons";

import { ingredientsFormStyles as styles } from "src/components/styles/recipeForm.styles";

const IngredientsForm = ({ index, remove }: IIngredientsForm) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const fieldErrors =
    (errors.ingredients &&
      Array.isArray(errors.ingredients) &&
      errors.ingredients[index]) ||
    {};

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <Box sx={styles.formContainer}>
        <Box>
          <TextField
            label="Ingredient"
            fullWidth
            required
            {...register(`recipeIngredients.${index}.ingredient`)}
            error={!!fieldErrors.ingredient}
            helperText={
              typeof fieldErrors.ingredient?.message === "string"
                ? fieldErrors.ingredient.message
                : undefined
            }
          />
        </Box>
        <Box sx={styles.quantityContainer}>
          <TextField
            label="Cantitate"
            type="number"
            fullWidth
            required
            onWheel={(e) => (e.target as HTMLInputElement).blur()} // prevent scroll-change
            {...register(`recipeIngredients.${index}.quantity`)}
            error={!!fieldErrors.quantity}
            helperText={
              typeof fieldErrors.quantity?.message === "string"
                ? fieldErrors.quantity.message
                : undefined
            }
          />
          <FormControl fullWidth>
            <InputLabel id="measure-select-label">U.M.</InputLabel>
            <Controller
              name={`recipeIngredients.${index}.measure`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  labelId="measure-select-label"
                  id="measure-select"
                  label="U.M."
                  fullWidth
                  required
                  error={!!errors.measure}
                  {...field}
                >
                  {measures.map((measure) => (
                    <MenuItem key={measure} value={measure}>
                      {measure}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>
      </Box>
      <Box sx={styles.buttonsContainer}>
        <PsButton
          variant="outlined"
          color="danger"
          startIcon={<DeleteOutlinedIcon />}
          onClick={() => remove(index)}
        />
      </Box>
    </Stack>
  );
};

export default IngredientsForm;
