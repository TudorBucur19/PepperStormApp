import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

import PsButton from "src/components/common/PsButton";
import { DeleteOutlinedIcon, EditNoteIcon } from "src/components/icons";
import { RECIPES_COLLECTION_NAME } from "src/constants/appConfigValues";
import useDatabase from "src/hooks/useDatabase";
import { IOwnerSection } from "src/types/components";

import { ownerSectionStyles as styles } from "src/components/styles/recipeDetails.styles";

const OwnerSection = ({ owner, documentId }: IOwnerSection) => {
  const { removeDocumentFromCollection } = useDatabase(RECIPES_COLLECTION_NAME);
  const navigate = useNavigate();
  const editRecipeHandler = () => {
    navigate(`/modifica-reteta/${documentId}`);
  };
  return (
    <Box sx={styles.actionsContainer}>
      <Typography
        sx={styles.ownerLabel}
      >{`By ${owner.displayName}`}</Typography>
      <PsButton
        variant="outlined"
        color="transparent"
        ariaLabel="Modifică rețeta"
        onClick={editRecipeHandler}
      >
        <EditNoteIcon />
      </PsButton>
      <PsButton
        variant="contained"
        color="danger"
        ariaLabel="Șterge rețeta"
        onClick={() =>
          removeDocumentFromCollection(RECIPES_COLLECTION_NAME, documentId)
        }
      >
        <DeleteOutlinedIcon />
      </PsButton>
    </Box>
  );
};

export default OwnerSection;
