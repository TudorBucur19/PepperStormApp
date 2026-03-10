export const ideaItemStyles = (editMode: boolean) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    margin: "0 auto",
    backgroundColor: editMode ? "secondary.light" : "transparent",
  },
  cardMedia: {
    aspectRatio: "1 / 1",
    width: { xs: "50%", sm: "8rem" },
    objectFit: "cover",
    flexShrink: 0,
    transition: "transform 180ms",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  details: {
    flex: 1,
  },
  titleContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
  },
  campingIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    flex: 1,
    minWidth: 0,
    fontSize: { xs: "1rem", sm: "1.2rem" },
    fontWeight: 700,
    color: "#337179",
    textTransform: "uppercase",
    textAlign: "left",
  },
  description: {
    textAlign: "left",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export const ideasListStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
  },
};
