import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { IRecipeFilters } from "src/types/components";
import { emptyRecipesFilters } from "src/constants/formsValues";

const RecipeFilters = ({
  value,
  categories,
  authors,
  specialTags,
  onApply,
}: IRecipeFilters) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(value);

  useEffect(() => {
    if (isOpen) {
      setDraftFilters(value);
    }
  }, [isOpen, value]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleClear = () => setDraftFilters(emptyRecipesFilters);
  const handleApply = () => {
    onApply(draftFilters);
    handleClose();
  };

  return (
    <>
      <Button
        type="button"
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={handleOpen}
        aria-label="filtrează rețetele"
      >
        Filtre
      </Button>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <Box sx={{ padding: "1rem" }}>
          <DialogTitle>Filtrează rețetele</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="recipe-filter-category-label">
                  Categorie
                </InputLabel>
                <Select
                  labelId="recipe-filter-category-label"
                  value={draftFilters.category}
                  label="Categorie"
                  onChange={(event) =>
                    setDraftFilters((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                >
                  <MenuItem value="">Toate categoriile</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="recipe-filter-author-label">Autor</InputLabel>
                <Select
                  labelId="recipe-filter-author-label"
                  value={draftFilters.authorId}
                  label="Autor"
                  onChange={(event) =>
                    setDraftFilters((current) => ({
                      ...current,
                      authorId: event.target.value,
                    }))
                  }
                >
                  <MenuItem value="">Toți autorii</MenuItem>
                  {authors.map((author) => (
                    <MenuItem key={author.id} value={author.id}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="recipe-filter-tags-label">
                  Etichete speciale
                </InputLabel>
                <Select
                  multiple
                  labelId="recipe-filter-tags-label"
                  value={draftFilters.specialTags}
                  label="Etichete speciale"
                  onChange={(event) =>
                    setDraftFilters((current) => ({
                      ...current,
                      specialTags:
                        typeof event.target.value === "string"
                          ? event.target.value.split(",")
                          : event.target.value,
                    }))
                  }
                  renderValue={(selected) => selected.join(", ")}
                >
                  {specialTags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      <Checkbox
                        checked={draftFilters.specialTags.includes(tag)}
                      />
                      <ListItemText primary={tag} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClear}>
              Resetează
            </Button>
            <Button type="button" onClick={handleClose}>
              Anulează
            </Button>
            <Button type="button" variant="contained" onClick={handleApply}>
              Aplică
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default RecipeFilters;
