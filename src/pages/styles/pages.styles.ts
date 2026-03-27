export const appLayoutStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  floatingBackButton: {
    position: "fixed",
    left: 16,
    bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
    zIndex: 1200,
    width: 52,
    height: 52,
    borderRadius: "50%",
    boxShadow: 4,
    bgcolor: "primary.main",
    color: "primary.contrastText",
    border: "1px solid",
    borderColor: "primary.dark",
    display: { xs: "inline-flex", sm: "none" },
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
};
