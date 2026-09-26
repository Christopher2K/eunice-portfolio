import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { css } from "styled/css";
import { Box, styled, VStack } from "styled/jsx";
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
      backgroundSize="cover"
      backgroundPosition="center center"
      style={{
        backgroundImage: `url(${currentProject.mainImage.url})`,
      }}
    >
      <Box pt="10" px="10" pb="20" color="text">
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
