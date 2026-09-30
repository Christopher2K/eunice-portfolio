import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { css } from "styled/css";
import { Box, HStack, VStack } from "styled/jsx";
import type { HomeProject } from "@/features/home/home.types";
import { MediaItem } from "@/features/media/components/media-item";
import { Text } from "@/ui/base";
import ArrowRightAltIcon from "@/ui/icons/arrow-right-alt.svg";

export type ProjectMobileCarouselProps = {
  projects: HomeProject[];
};

export const ProjectsMobileCarousel = ({
  projects,
}: ProjectMobileCarouselProps) => {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const sliderContainer = sliderContainerRef.current;
  const slideNumber = projects.length;
  const currentSlide = projects[slideIndex].project;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const frameSize = target.scrollHeight / slideNumber;
    const newIndex = Math.ceil(target.scrollTop / frameSize);
    if (projects[newIndex]) {
      setSlideIndex(newIndex);
    }
  };

  const handleCarouselDotClick = (index: number) => {
    if (!sliderContainer) return;
    sliderContainer.scrollTo({
      behavior: "smooth",
      top: (index * sliderContainer.scrollHeight) / slideNumber,
    });
  };

  return (
    <Box
      hideFrom="lg"
      ref={sliderContainerRef}
      width="100svw"
      height="100svh"
      overflow="auto"
      scrollSnapType="y mandatory"
      scrollMargin="100px"
      onScroll={handleScroll}
      position="relative"
      scrollbar="hidden"
    >
      {projects.map(({ project, opacity }) => (
        <Box
          key={project.name}
          width="100svw"
          height="100svh"
          position="relative"
          overflow="hidden"
          scrollSnapAlign="start"
        >
          <MediaItem
            media={project.mainImage}
            objectFit="cover"
            className={css({
              height: "100%",
              objectPosition: "center",
              opacity,
            })}
          />
        </Box>
      ))}

      <HStack
        as="section"
        position="fixed"
        bottom="0"
        left="0"
        justifyContent="flex-end"
        alignItems="flex-end"
        width="100%"
        py="10"
        px="5"
        gap="14"
        zIndex="10"
        pointerEvents="none"
      >
        <VStack
          width="full"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="3"
          color="text"
        >
          <Text variant="xsmallSubhead">[Selected work]</Text>
          <Text variant="heading4">{currentSlide.name}</Text>
          <Link to="/work" className={css({ pointerEvents: "all" })}>
            <ArrowRightAltIcon />
          </Link>
        </VStack>
        <VStack gap="3">
          {projects.map(({ project }, index) => (
            <Box
              key={project.name}
              as="button"
              // @ts-expect-error
              type="button"
              cursor="pointer"
              borderRadius="full"
              width="8px"
              height="8px"
              opacity={index === slideIndex ? 1 : 0.3}
              backgroundColor="text"
              onClick={() => handleCarouselDotClick(index)}
            ></Box>
          ))}
        </VStack>
      </HStack>
    </Box>
  );
};
