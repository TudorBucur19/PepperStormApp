import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import GenericContainer from "src/components/common/GenericContainer";
import PsButton from "src/components/common/PsButton";
import { URLS } from "src/constants/urls";

import { errorPageSyles as styles } from "src/pages/styles/pages.styles";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <GenericContainer>
      <Box sx={styles.container}>
        <Typography variant="h4" align="center" gutterBottom>
          Ceva nu a mers bine :(
        </Typography>
        <Typography variant="body1" align="center">
          Pagina pe care o cauți nu există sau a apărut o eroare neașteptată.
        </Typography>
        <PsButton
          variant="outlined"
          color="transparent"
          onClick={() => navigate(URLS.HOME)}
        >
          Înapoi la pagina principală
        </PsButton>
      </Box>
    </GenericContainer>
  );
};

export default ErrorPage;
