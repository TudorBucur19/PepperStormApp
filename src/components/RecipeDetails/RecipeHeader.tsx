import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { IRecipHeader } from "src/types/components";
import IconTextProperty from "src/components/common/IconTextProperty";
import {
  AccessTimeIcon,
  PeopleOutlineIcon,
  SignalCellular1BarIcon,
  SignalCellular2BarIcon,
  SignalCellular4BarIcon,
} from "src/components/icons";
import { formatMinutesRo } from "src/utils/uiFunctions";
import ChipInfo from "src/components/common/ChipInfo";
import OwnerSection from "src/components/RecipeDetails/OwnerSection";
import { complexityLevels } from "src/constants/appConfigValues";
import TentIcon from "src/components/icons/TentIcon";

import { recipeHeaderStyles as styles } from "../styles/recipeDetails.styles";

const RecipeHeader = ({
  documentId,
  title,
  preparationTime,
  servings,
  category,
  specialTag,
  owner,
  imageURL,
  complexity = "medium",
}: IRecipHeader) => {
  const { container, titleText } = styles;
  const headerIconsColor = "secondary";

  const recipeComplexityIcon = {
    easy: <SignalCellular1BarIcon color={headerIconsColor} />,
    medium: <SignalCellular2BarIcon color={headerIconsColor} />,
    hard: <SignalCellular4BarIcon color={headerIconsColor} />,
  };

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
          icon={<AccessTimeIcon color={headerIconsColor} />}
          text={formatMinutesRo(Number(preparationTime))}
        />
        <IconTextProperty
          icon={<PeopleOutlineIcon color={headerIconsColor} />}
          text={`${servings} porții`}
        />
        <IconTextProperty
          icon={recipeComplexityIcon[complexity]}
          text={complexityLevels[complexity]}
        />
      </Stack>
      <Box display="flex" gap={2}>
        {specialTag &&
          specialTag.length > 0 &&
          specialTag.map((tag) => (
            <ChipInfo
              key={tag}
              label={
                tag.toLowerCase() === "camping friendly" ? (
                  <TentIcon fill="#fff" />
                ) : (
                  tag
                )
              }
              variant="filled"
              color={tag.toLowerCase() === "picant" ? "error" : "success"}
              useCase="specialTag"
            />
          ))}
      </Box>
      <Divider orientation="horizontal" flexItem />
      <OwnerSection owner={owner} documentId={documentId} imageURL={imageURL} />
    </Box>
  );
};

export default RecipeHeader;
