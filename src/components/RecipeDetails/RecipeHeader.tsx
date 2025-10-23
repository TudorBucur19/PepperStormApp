import { FC } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { IRecipHeader } from "src/interfaces/components";
import IconTextProperty from "src/components/common/IconTextProperty";
import {
  AccessTimeIcon,
  PeopleOutlineIcon,
  PermMediaOutlinedIcon,
} from "src/components/icons";
import { formatMinutesRo } from "src/utils/uiFunctions";
import ChipInfo from "src/components/common/ChipInfo";

import { styles } from "src/components/styles/RecipeHeader.styles";

const RecipeHeader: FC<IRecipHeader> = ({
  title,
  preparationTime,
  servings,
  category,
  specialTag,
}) => {
  const { container, titleText } = styles;
  return (
    <Box sx={container}>
      <Typography variant="h4" component="h1" sx={titleText}>
        {title}
      </Typography>
      <ChipInfo
        label={category}
        variant="filled"
        color="primary"
        useCase="category"
      />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <IconTextProperty
          icon={<AccessTimeIcon />}
          text={formatMinutesRo(Number(preparationTime))}
        />
        <IconTextProperty
          icon={<PeopleOutlineIcon />}
          text={`${servings} porții`}
        />
        <IconTextProperty icon={<PermMediaOutlinedIcon />} text="Imagini" />
      </Stack>
      <Box display="flex" gap={2}>
        {specialTag &&
          specialTag.length > 0 &&
          specialTag.map((tag) => (
            <ChipInfo
              key={tag}
              label={tag}
              variant="filled"
              color={tag === "Picant" ? "error" : "success"}
              useCase="specialTag"
            />
          ))}
      </Box>
    </Box>
  );
};

export default RecipeHeader;
