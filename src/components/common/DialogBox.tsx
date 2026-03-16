import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import PsButton from "src/components/common/PsButton";
import { useStore } from "src/store/rootStore";
import { IDialogBox } from "src/types/components";

const DialogBox = ({
  title,
  children,
  confirmLabel,
  cancelLabel,
  confirmAction,
  open,
  onClose,
}: IDialogBox) => {
  const globalOpen = useStore((state) => state.modal.isOpen);
  const setModalOpen = useStore((state) => state.setModalOpen);

  const isOpen = open ?? globalOpen;

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    setModalOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
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
