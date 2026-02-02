import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PsButton from "src/components/common/PsButton";
import { useStore } from "src/store/rootStore";
import { IDialogBox } from "src/types/components";

const DialogBox = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  confirmAction,
}: IDialogBox) => {
  const open = useStore((state) => state.modal.isOpen);
  const setModalOpen = useStore((state) => state.setModalOpen);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <PsButton variant="text" color="transparent" onClick={handleClose}>
          {cancelLabel}
        </PsButton>
        <PsButton variant="outlined" color="danger" onClick={confirmAction}>
          {confirmLabel}
        </PsButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
