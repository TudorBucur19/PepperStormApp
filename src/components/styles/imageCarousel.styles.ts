export const imageCarouselStyles = {
  container: {
    position: "relative",
    width: { xs: "100%", sm: "50%" },
  },
  viewPortContainer: { overflow: "hidden" },
  images: { display: "flex" },
  imageSlider: {
    flex: "0 0 100%",
  },
  imageBox: {
    flex: 1,
    maxWidth: { xs: "100%", sm: "100%" },
    aspectRatio: "3 / 4",
    borderRadius: { xs: 2, sm: 2 },
    objectFit: "cover",
    padding: { xs: 0, sm: "1rem" },
  },
  arrow: {
    display: { xs: "none", sm: "flex" },
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    bgcolor: "rgba(0,0,0,0.45)",
    color: "white",
    zIndex: 2,
    p: 0.5,
    borderRadius: "50%",
    boxShadow: 2,
  },
  arrowRight: {
    right: 8,
  },
  arrowLeft: {
    left: 8,
  },
  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 1,
    mt: 1.5,
  },
  dotsList: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
};
