import { useLocation, useNavigate } from "react-router";
import Fab from "@mui/material/Fab";

import { KeyboardArrowLeft } from "src/components/icons";
import { URLS } from "src/constants/urls";
import { useStore } from "src/store/rootStore";

import { appLayoutStyles as styles } from "src/pages/styles/pages.styles";

const FloatingBackButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMobile = useStore((state) => state.screen.isMobile);

  if (!isMobile || pathname === URLS.HOME) {
    return null;
  }

  const handleBack = () => {
    if (globalThis.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(URLS.HOME);
  };

  return (
    <Fab
      aria-label="Înapoi"
      color="primary"
      onClick={handleBack}
      sx={styles.floatingBackButton}
    >
      <KeyboardArrowLeft />
    </Fab>
  );
};

export default FloatingBackButton;
