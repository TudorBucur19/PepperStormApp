import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { SearchIcon } from "src/components/icons";

const searchInputStyles = {
  container: {
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
};

const SearchInput = () => {
  return (
    <Paper component="form" sx={searchInputStyles.container}>
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search recipe"
        inputProps={{ "aria-label": "search recipe" }}
      />
    </Paper>
  );
};

export default SearchInput;
