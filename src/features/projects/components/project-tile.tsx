import { Link } from "@tanstack/react-router";
import { css } from "styled/css";
import { styled, VStack } from "styled/jsx";
import { Text } from "@/ui/base";

type ProjectTileProps = {
  // id: string;
  thumbnail: string;
  name: string;
  type: string;
};

export const ProjectTile = ({ thumbnail, name, type }: ProjectTileProps) => {
  return (
    <Link
      to="/work"
      className={css({ width: "100%", display: "block", color: "text" })}
    >
      <VStack justifyContent="flex-start" alignItems="flex-start" width="full">
        <Text variant={{ base: "xsmallSubhead", lg: "smallSubhead" }}>
          [{type}]
        </Text>
        <Text variant={{ base: "small", lg: "body" }}>{name}</Text>
        <styled.img
          src={thumbnail}
          alt={name}
          width="100%"
          aspectRatio="16/9"
        />
      </VStack>
    </Link>
  );
};
