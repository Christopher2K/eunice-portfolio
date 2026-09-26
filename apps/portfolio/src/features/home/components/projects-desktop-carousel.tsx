import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { css } from "styled/css";
import { Box, styled, VStack } from "styled/jsx";
import { MediaItem } from "@/features/media/components/media-item";
import type { SanitizedProject } from "@/features/projects/projects.types";
import { Text } from "@/ui/base";

export type ProjectDesktopCarouselProps = {
  projects: SanitizedProject[];
};

export const ProjectsDesktopCarousel = ({
  projects,
}: ProjectDesktopCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentProject = projects[selectedIndex];

  const handleItemHover = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <VStack
      hideBelow="lg"
      width="100vw"
      height="100vh"
      justifyContent="flex-end"
      alignItems="flex-start"
      position="relative"
      overflow="hidden"
    >
      <MediaItem
        key={currentProject.mainImage.url}
        media={currentProject.mainImage}
        objectFit="cover"
        className={css({
          position: "absolute",
          inset: 0,
          height: "100%",
          objectPosition: "center",
        })}
      />
      <Box pt="10" px="10" pb="20" color="text" position="relative">
        <Text variant="subhead" className={css({ marginBottom: "5" })}>
          [Selected Work]
        </Text>

        <VStack
          as="ul"
          listStyle="none"
          gap="0"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {projects.map(({ name, id }, index) => (
            <styled.li
              key={name}
              onMouseEnter={() => handleItemHover(index)}
              opacity={index === selectedIndex ? 1 : 0.3}
            >
              <Link
                to="/work/$projectId"
                params={{ projectId: id.toString() }}
                className="link"
              >
                <Text variant="heading4">{name}</Text>
              </Link>
            </styled.li>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};
