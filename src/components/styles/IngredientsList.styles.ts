export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  listContainer: {
    maxWidth: "fit-content",
    minWidth: { xs: "100%", sm: "70%" },
    padding: "1.5rem",
    borderRadius: "1rem",
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: "2rem",
    color: "#337179",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  listItem: {
    width: "100%",
    textAlign: "left",
    color: "#254a5d",
    fontSize: "1rem",
    borderBottom: "0.3px solid #254a5d4d",
    paddingY: "0.8rem",
  },
  lastListItem: {
    borderBottom: "none",
    paddingBottom: "0",
  },
};
