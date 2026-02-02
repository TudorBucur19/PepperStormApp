import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

import PsButton from "src/components/common/PsButton";
import { DeleteOutlinedIcon, EditNoteIcon } from "src/components/icons";
import { RECIPES_COLLECTION_NAME } from "src/constants/appConfigValues";
import useDatabase from "src/hooks/useDatabase";
import { IOwnerSection } from "src/types/components";
import { useAuthContext } from "src/hooks/AuthContext";

import { ownerSectionStyles as styles } from "src/components/styles/recipeDetails.styles";
import { useStore } from "src/store/rootStore";
import DialogBox from "src/components/common/DialogBox";
import { URLS } from "src/constants/urls";

const OwnerSection = ({ owner, documentId }: IOwnerSection) => {
  const { removeDocumentFromCollection } = useDatabase(RECIPES_COLLECTION_NAME);
  const { loggedUser } = useAuthContext();
  const setModalOpen = useStore((state) => state.setModalOpen);
  const navigate = useNavigate();
  const editRecipeHandler = () => {
    navigate(URLS.EDIT_RECIPE(documentId));
  };
  const deleteRecipeHandler = () => {
    removeDocumentFromCollection(RECIPES_COLLECTION_NAME, documentId);
    setModalOpen(false);
    navigate(URLS.HOME);
  };
  const isAdmin = loggedUser?.userID === "tOkQZxEnP6htFGgp6KXEHTBySBR2";
  const isOwnerLoggedInUser = loggedUser?.userID === owner.userID;
  const haveFullAccess = isAdmin || isOwnerLoggedInUser;

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
        description="Ești sigur că vrei să ștergi această rețetă?"
        confirmLabel="Șterge"
        cancelLabel="Anulează"
        confirmAction={deleteRecipeHandler}
      />
    </Box>
  );
};

export default OwnerSection;
