import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import PsButton from "src/components/common/PsButton";
import { DeleteOutlinedIcon, EditNoteIcon } from "src/components/icons";
import {
  RECIPES_PHOTOS_COLLECTION_NAME,
  QUERY_KEYS,
} from "src/constants/appConfigValues";
import useRecipesDatabase from "src/hooks/useRecipesDatabase";
import { IOwnerSection } from "src/types/components";
import { useAuthContext } from "src/hooks/AuthContext";
import { useStore } from "src/store/rootStore";
import DialogBox from "src/components/common/DialogBox";
import { URLS } from "src/constants/urls";
import useUploadFiles from "src/hooks/useUploadFiles";

import { ownerSectionStyles as styles } from "src/components/styles/recipeDetails.styles";

const OwnerSection = ({ owner, documentId, imageURL }: IOwnerSection) => {
  const { removeRecipe } = useRecipesDatabase();
  const { deleteFileHandler } = useUploadFiles(RECIPES_PHOTOS_COLLECTION_NAME);
  const { checkOwnership } = useAuthContext();
  const setModalOpen = useStore((state) => state.setModalOpen);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const editRecipeHandler = () => {
    navigate(URLS.EDIT_RECIPE(documentId));
  };
  const deleteRecipeHandler = async () => {
    try {
      await removeRecipe(documentId);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ALL_RECIPES_QUERY_KEY,
      });
      if (imageURL && imageURL.length > 0) {
        imageURL.forEach((image) => {
          deleteFileHandler(image.name);
        });
      }
      setModalOpen(false);
      navigate(URLS.HOME);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      // Handle error, maybe show a toast or something
    }
  };
  const haveFullAccess = checkOwnership(owner.userID);

  return (
    <Box sx={styles.actionsContainer}>
      <Typography sx={styles.ownerLabel}>
        {`By ${owner.displayName}`}
      </Typography>
      {haveFullAccess && (
        <>
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
            onClick={() => setModalOpen(true)}
          >
            <DeleteOutlinedIcon />
          </PsButton>
        </>
      )}
      <DialogBox
        title="Confirmare ștergere"
        confirmLabel="Șterge"
        cancelLabel="Anulează"
        confirmAction={deleteRecipeHandler}
      >
        Ești sigur că vrei să ștergi această rețetă?
      </DialogBox>
    </Box>
  );
};

export default OwnerSection;
