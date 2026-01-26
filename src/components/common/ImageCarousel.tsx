import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { IImageCarousel } from "src/types/components";
import { KeyboardArrowLeft, KeyboardArrowRight } from "src/components/icons";

import { imageCarouselStyles as styles } from "src/components/styles/imageCarousel.styles";

const ImageCarousel = ({ images }: IImageCarousel) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      onSelect();
    });

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <Box sx={styles.container}>
      {/* Viewport */}
      <Box ref={emblaRef} sx={styles.viewPortContainer}>
        {/* Container */}
        <Box sx={styles.images}>
          {images.map((img) => (
            <Box key={img.name} sx={styles.imageSlider}>
              <Box component="img" src={img.url} alt="" sx={styles.imageBox} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Arrows overlayed on image sides */}
      <IconButton
        onClick={() => emblaApi?.scrollPrev()}
        sx={{ ...styles.arrow, ...styles.arrowLeft }}
        aria-label="previous image"
      >
        <KeyboardArrowLeft fontSize="large" />
      </IconButton>

      <IconButton
        onClick={() => emblaApi?.scrollNext()}
        sx={{ ...styles.arrow, ...styles.arrowRight }}
        aria-label="next image"
      >
        <KeyboardArrowRight fontSize="large" />
      </IconButton>

      {/* Dots */}
      <Box sx={styles.dotsContainer}>
        {Array.from({ length: snapCount }).map((_, i) => (
          <Box
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            sx={{
              ...styles.dotsList,
              bgcolor: i === selectedIndex ? "primary.main" : "grey.400",
              transform: i === selectedIndex ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageCarousel;
