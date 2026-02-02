import Box from "@mui/material/Box";

import { AddIcon, PeopleOutlineIcon, RemoveIcon } from "src/components/icons";

const ServingsHandler = () => {
  return (
    <Box>
      <AddIcon />
      <PeopleOutlineIcon color={"secondary"} />
      <RemoveIcon />
    </Box>
  );
};

export default ServingsHandler;
