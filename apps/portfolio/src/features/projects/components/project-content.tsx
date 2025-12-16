import { css } from "styled/css";
import { Box, VStack } from "styled/jsx";
import { type TextVariantProps, text } from "styled/recipes";
import { MediaView } from "@/features/media/components/media-view";
import { Button, Text } from "@/ui/base";
import type { SanitizedContent } from "../projects.types";

export type ProjectContentProps = {
  content: SanitizedContent;
};

const layoutToAlignItems = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
} as const;

export const ProjectContent = ({ content }: ProjectContentProps) => {
  switch (content.__tag) {
    case "SanitizedQuoteContent": {
      const isSmall = content.layout === "small";
      const textVariant: TextVariantProps = isSmall
        ? {
            variant: {
              base: "emSmall",
              lg: "emLarge",
            },
          }
        : {
            variant: {
              base: "heading4",
              lg: "heading2",
            },
          };

      return (
        <VStack
          py="32"
          gap="10"
          marginLeft="auto"
          width={{
            base: "full",
            lg: isSmall ? "50%" : "full",
          }}
        >
          <Box
            className={text(textVariant)}
            width="full"
            textAlign={isSmall ? "right" : "center"}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Intentional
            dangerouslySetInnerHTML={{ __html: content.text }}
          />

          <Text
            variant={{
              base: "smallSubhead",
              lg: "subhead",
            }}
            className={css({
              textAlign: isSmall ? "left" : "center",
              width: "full",
            })}
          >
            {content.author}
          </Text>
        </VStack>
      );
    }
    case "SanitizedLinkContent":
      return (
        <VStack
          width="full"
          py={{
            base: "10",
            lg: "20",
          }}
          gap="0"
          alignItems={layoutToAlignItems[content.layout]}
        >
          <Text
            variant={{
              base: "smallSubhead",
              lg: "subhead",
            }}
          >
            {content.title}
          </Text>

          <Button
            as="a"
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            size={{
              base: "large",
              lg: "xlarge",
            }}
            variant="secondary"
          >
            {content.name}
          </Button>
        </VStack>
      );
    case "SanitizedMediaContent":
      return (
        <Box
          width="full"
          py={{
            base: "10",
            lg: "20",
          }}
        >
          <MediaView content={content} />
        </Box>
      );
  }
};
