import { useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";

import { HighlightOffIcon, SearchIcon } from "src/components/icons";
import useRecipesDatabase from "src/hooks/useRecipesDatabase";

import { searchInputStyles as styles } from "../styles/commonComponents.styles";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchRecipesByTitle } = useRecipesDatabase();
  const handleSearch = () => {
    if (inputRef.current) {
      const query = inputRef.current.value.toLowerCase();
      console.log("Searching for:", query);
      searchRecipesByTitle(query);
    }
  };
  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    searchRecipesByTitle("");
  };

  return (
    <Container component="form" maxWidth="xl">
      <Paper variant="outlined" sx={styles.inputContainer}>
        <IconButton
          type="button"
          sx={styles.icon}
          aria-label="clear search input"
          onClick={clearSearch}
        >
          <HighlightOffIcon />
        </IconButton>
        <InputBase
          name="searchRecipe"
          inputRef={inputRef}
          sx={styles.input}
          placeholder="Caută o rețetă"
          inputProps={{ "aria-label": "căutare rețetă" }}
        />
        <IconButton
          type="button"
          sx={styles.icon}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Container>
  );
};

export default SearchInput;
