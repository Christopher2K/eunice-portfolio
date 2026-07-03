import { Link } from "@tanstack/react-router";
import { css } from "styled/css";
import { VStack } from "styled/jsx";
import { MediaItem } from "@/features/media/components/media-item";
import type { SanitizedMedia } from "@/features/media/media.types";
import { Text } from "@/ui/base";

type ProjectTileProps = {
  id: string;
  media: SanitizedMedia;
  name: string;
  type: string;
};

export const ProjectTile = ({ id, media, name, type }: ProjectTileProps) => {
  return (
    <Link
      to="/work/$projectId"
      params={{ projectId: id }}
      className={css({ width: "100%", display: "block", color: "text" })}
    >
      <VStack justifyContent="flex-start" alignItems="flex-start" width="full">
        <Text variant={{ base: "xsmallSubhead", lg: "smallSubhead" }}>
          [{type}]
        </Text>
        <Text variant={{ base: "small", lg: "body" }}>{name}</Text>
        <MediaItem
          media={media}
          aspectRatio="16/9"
          objectFit="contain"
          pointerEvents="none"
        />
      </VStack>
    </Link>
  );
};
