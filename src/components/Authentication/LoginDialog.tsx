import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import PsButton from "src/components/common/PsButton";
import CatLogo from "src/components/Header/CatLogo";
import { GoogleIcon } from "src/components/icons";
import useAuth from "src/hooks/useAuth";

const styles = {
  dialogContainer: {
    maxWidth: 400,
    margin: { xs: "6rem 1rem", sm: "6rem auto" },
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },
};

const LoginDialog = () => {
  const { handleGoogleLogin } = useAuth();

  return (
    <Paper sx={styles.dialogContainer}>
      <CatLogo />
      <Typography>
        Bine ai venit! Pentru a continua trebuie să te autentifici.
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
