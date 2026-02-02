import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { HighlightOffIcon, SearchIcon } from "src/components/icons";
import { Container } from "@mui/material";
import { useRef } from "react";
import useDatabase from "src/hooks/useDatabase";
import { RECIPES_COLLECTION_NAME } from "src/constants/appConfigValues";

import { searchInputStyles as styles } from "../styles/commonComponents.styles";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchByTitle } = useDatabase(RECIPES_COLLECTION_NAME);
  const handleSearch = () => {
    if (inputRef.current) {
      const query = inputRef.current.value.toLowerCase();
      console.log("Searching for:", query);
      searchByTitle(query);
    }
  };
  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    searchByTitle("");
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
