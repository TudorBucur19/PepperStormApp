import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import PsButton from "src/components/common/PsButton";
import CatLogo from "src/components/Header/CatLogo";
import { GoogleIcon } from "src/components/icons";
import { useAuthContext } from "src/hooks/AuthContext";

import { loginDialogStyles as styles } from "src/components/styles/authentication.styles";

const LoginDialog = () => {
  const { handleGoogleLogin } = useAuthContext();

  return (
    <Paper sx={styles.dialogContainer}>
      <CatLogo />
      <Typography>
        Pentru a adăuga, modifica sau șterge rețete trebuie să te autentifici.
      </Typography>
      <PsButton
        variant="outlined"
        color="transparent"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
      >
        Autentificare cu Google
      </PsButton>
    </Paper>
  );
};

export default LoginDialog;
