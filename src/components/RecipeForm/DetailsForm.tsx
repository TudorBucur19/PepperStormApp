import { useEffect, useRef, useState } from "react";
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

import {
  complexityLevels,
  RECIPES_PHOTOS_COLLECTION_NAME,
} from "src/constants/appConfigValues";
import FileUploadField from "src/components/RecipeForm/FileUploadField";
import DialogBox from "src/components/common/DialogBox";
import useSettingsDatabase from "src/hooks/useSettingsDatabase";
import { useStore } from "src/store/rootStore";

const DetailsForm = () => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { getSettingsCollectionData } = useSettingsDatabase();
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const appSettings = useStore((s) => s.appSettings);
  const { categories, specialTags } = appSettings;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const availableCategories = [
    ...categories,
    ...customCategories,
    "Categorie nouă",
  ];

  useEffect(() => {
    const fetchAppSettings = async () => {
      await getSettingsCollectionData();
    };
    fetchAppSettings();
  }, []);

  const handleOtherCategorySelect = (value: string) => {
    if (value === "Categorie nouă") {
      setIsModalOpen(true);
    }
  };

  const handleAddCategory = () => {
    const trimmedCategory =
      categoryInputRef.current?.value.trim().toLowerCase() || "";

    if (!trimmedCategory) {
      return;
    }

    if (!availableCategories.includes(trimmedCategory)) {
      setCustomCategories((prev) => [...prev, trimmedCategory]);
    }

    setValue("category", trimmedCategory, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    if (categoryInputRef.current) {
      categoryInputRef.current.value = "";
    }
    setIsModalOpen(false);
  };

  return (
    <Stack spacing={2} width={{ xs: "100%", md: "50%" }}>
      <Typography variant="h5">Detaliile rețetei</Typography>
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
              {availableCategories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                  onClick={() => handleOtherCategorySelect(category)}
                >
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
        {...register("preparationTime", {
          valueAsNumber: true,
          setValueAs: (v) => (v === "" || v == null ? undefined : Number(v)),
        })}
        error={!!errors.preparationTime}
        helperText={
          typeof errors.preparationTime?.message === "string"
            ? errors.preparationTime.message
            : undefined
        }
      />
      {/* Extracted handler to avoid deep nesting */}
      <Controller
        name="specialTag"
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
        minRows={4}
        fullWidth
        required
        {...register("prepSteps")}
        error={!!errors.prepSteps}
        helperText={
          typeof errors.prepSteps?.message === "string"
            ? errors.prepSteps.message
            : undefined
        }
        sx={{
          "& .MuiInputBase-inputMultiline": {
            resize: "vertical",
          },
        }}
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
      <FormControl fullWidth>
        <InputLabel id="complexity-select-label">Dificultate</InputLabel>
        <Controller
          name="complexity"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              labelId="complexity-select-label"
              id="complexity-select"
              label="Dificultate"
              fullWidth
              required
              error={!!errors.complexity}
              {...field}
            >
              {Object.entries(complexityLevels).map(([key, label]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <FileUploadField
        fileCollectionName={RECIPES_PHOTOS_COLLECTION_NAME}
        formFieldName="imageURL"
      />
      <DialogBox
        title="Adaugă o categorie nouă"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        confirmLabel="Adaugă"
        cancelLabel="Închide"
        confirmAction={handleAddCategory}
      >
        <TextField
          placeholder="Nume categorie"
          fullWidth
          inputRef={categoryInputRef}
        />
      </DialogBox>
    </Stack>
  );
};

export default DetailsForm;
