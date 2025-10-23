import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Box, Stack, TextField, Typography } from "@mui/material";

const schema = z.object({
  title: z.string().min(2, "Titlul este prea scurt"),
  servings: z.coerce.number().int().min(1, "Minim 1 porție"),
  prepMinutes: z.coerce.number().int().min(1, "Minim 1 minut"),
  instructions: z.string().min(5, "Adaugă instrucțiuni"),
});

type FormValues = z.infer<typeof schema>;

const NewRecipeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      servings: 1,
      prepMinutes: 10,
      instructions: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    // simulate save
    await new Promise((r) => setTimeout(r, 500));
    console.log("Submitting:", data);
    reset();
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" gutterBottom>
          Create New Recipe
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Titlu"
            fullWidth
            required
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Porții"
            type="number"
            fullWidth
            required
            inputProps={{ min: 1, inputMode: "numeric", step: 1 }}
            onWheel={(e) => (e.target as HTMLInputElement).blur()} // prevent scroll-change
            {...register("servings")}
            error={!!errors.servings}
            helperText={errors.servings?.message}
          />

          <TextField
            label="Timp de preparare (minute)"
            type="number"
            fullWidth
            required
            inputProps={{ min: 1, inputMode: "numeric", step: 1 }}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            {...register("prepMinutes")}
            error={!!errors.prepMinutes}
            helperText={errors.prepMinutes?.message}
          />

          <TextField
            label="Instrucțiuni"
            multiline
            rows={4}
            fullWidth
            required
            {...register("instructions")}
            error={!!errors.instructions}
            helperText={errors.instructions?.message}
          />

          {/* <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ alignSelf: "flex-start" }}
          >
            Salvează
          </LoadingButton> */}
        </Stack>
      </Box>
    </Container>
  );
};

export default NewRecipeForm;
