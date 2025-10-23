export const styles = {
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    textAlign: "left",
    color: "#254a5d",
    fontSize: "1rem",
    borderBottom: "0.3px solid #254a5d4d",
    paddingY: "0.8rem",
    cursor: "pointer",
  },
  lastListItem: {
    borderBottom: "none",
    paddingBottom: "0",
  },
  checkBox: {
    visibility: "hidden",
    "&.Mui-checked": {
      visibility: "visible",
    },
  },
};
