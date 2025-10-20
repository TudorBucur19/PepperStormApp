export const styles = {
  recipesContainer: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    gap: { xs: "1.2rem", sm: "1.6rem", md: "2rem" },
    padding: "1rem",
  },
};
