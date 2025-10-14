import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { css } from "styled/css";
import { Box, styled, VStack } from "styled/jsx";
import { Text } from "@/ui/base";

const Frames = [
  {
    name: "Wrensilva",
    image: "https://picsum.photos/seed/eunice1/1920/1080",
  },
  {
    name: "San Diego Museum of Art",
    image: "https://picsum.photos/seed/eunice2/1920/1080",
  },
  {
    name: "Chicago MOMA",
    image: "https://picsum.photos/seed/eunice3/1920/1080",
  },
];

export const ProjectsDesktopCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentProject = Frames[selectedIndex];

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
        backgroundImage: `url(${currentProject.image})`,
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
          {Frames.map(({ name }, index) => (
            <styled.li
              key={name}
              onMouseEnter={() => handleItemHover(index)}
              opacity={index === selectedIndex ? 1 : 0.3}
            >
              <Link to="/work" className="link">
                <Text variant="heading4">{name}</Text>
              </Link>
            </styled.li>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};
