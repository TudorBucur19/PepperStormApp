import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import GenericContainer from "src/components/common/GenericContainer";
import PsButton from "src/components/common/PsButton";
import { URLS } from "src/constants/urls";
import { IErrorFallback } from "src/types/components";

import { errorFallbackStyles as styles } from "src/components/styles/commonComponents.styles";

const ErrorFallback = ({ errorMessage, title }: IErrorFallback) => {
  const navigate = useNavigate();

  return (
    <GenericContainer>
      <Box sx={styles.container}>
        <Typography variant="h4" align="center" gutterBottom>
          {title || "Ceva nu a mers bine :("}
        </Typography>
        <Typography variant="body1" align="center" color="error">
          {errorMessage ||
            "Pagina pe care o cauți nu există sau a apărut o eroare neașteptată."}
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

export default ErrorFallback;
