import Typography from "@mui/material/Typography";

import { IPageTitle } from "src/types/components";

import { pageTitleStyles as styles } from "src/components/styles/commonComponents.styles";

const PageTitle = ({ children, size = "medium" }: IPageTitle) => {
  return (
    <Typography component="h1" sx={styles(size).title}>
      {children}
    </Typography>
  );
};

export default PageTitle;
