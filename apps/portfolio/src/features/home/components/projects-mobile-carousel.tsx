import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { css } from "styled/css";
import { Box, HStack, VStack } from "styled/jsx";
import type { SanitizedProject } from "@/features/projects/projects.types";
import { Text } from "@/ui/base";
import ArrowRightAltIcon from "@/ui/icons/arrow-right-alt.svg";

export type ProjectMobileCarouselProps = {
  projects: SanitizedProject[];
};

export const ProjectsMobileCarousel = ({
  projects,
}: ProjectMobileCarouselProps) => {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const sliderContainer = sliderContainerRef.current;
  const slideNumber = projects.length;
  const currentSlide = projects[slideIndex];

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
      {projects.map((frame) => (
        <Box
          key={frame.name}
          width="100svw"
          height="100svh"
          position="relative"
          backgroundPosition="center center"
          backgroundSize="cover"
          scrollSnapAlign="start"
          style={{
            backgroundImage: `url(${frame.mainImage.url})`,
          }}
        />
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
          {projects.map(({ name }, index) => (
            <Box
              key={name}
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
