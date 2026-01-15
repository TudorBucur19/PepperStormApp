import { useFieldArray, useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import IngredientsForm from "src/components/RecipeForm/IngredientsForm";
import PsButton from "src/components/common/PsButton";
import { AddIcon } from "src/components/icons";

const IngredientsSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Ingrediente</Typography>
      {fields.map((field, index) => (
        <IngredientsForm
          key={field.id}
          index={index}
          isEmptyForm={false}
          append={append}
          remove={remove}
        />
      ))}
      <PsButton
        variant="outlined"
        color="transparent"
        startIcon={<AddIcon />}
        onClick={() => append({ ingredient: "", quantity: 0, measure: "" })}
      >
        Adaugă ingredient
      </PsButton>
    </Stack>
  );
};

export default IngredientsSection;
