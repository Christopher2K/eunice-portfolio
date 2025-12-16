import { css } from "styled/css";
import { Box, VStack } from "styled/jsx";
import { type TextVariantProps, text } from "styled/recipes";
import { MediaView } from "@/features/media/components/media-view";
import { Text } from "@/ui/base";
import type { SanitizedContent } from "../projects.types";

export type ProjectContentProps = {
  content: SanitizedContent;
};

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
          px={{
            base: "5",
            lg: "10",
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
      return <VStack>Link</VStack>;
    case "SanitizedMediaContent":
      return <MediaView content={content} />;
  }
};
