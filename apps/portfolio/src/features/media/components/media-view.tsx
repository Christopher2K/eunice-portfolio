import { Fragment, type JSX, useMemo } from "react";
import { css } from "styled/css";
import { Box, Flex, styled, VStack } from "styled/jsx";
import { Text } from "@/ui/base";
import type { SanitizedMediaContent } from "../media.types";

type CaptionProps = {
  caption?: string | null;
};
const Caption = ({ caption }: CaptionProps) => {
  if (!caption) return null;
  return (
    <Text
      variant="small"
      color="text"
      className={css({ textAlign: "left", width: "full" })}
    >
      {caption}
    </Text>
  );
};

type MediaContentRenderSpec = {
  precidate: (content: SanitizedMediaContent) => boolean;
  render: (props: { content: SanitizedMediaContent }) => JSX.Element;
};

const mediaFullWidthContentSpec: MediaContentRenderSpec = {
  precidate: (content) => content.type === "fullWidth",
  render: ({ content }) => (
    <VStack
      width="full"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="5"
    >
      {content.mediaList.map((media) => (
        <Fragment>
          <styled.img
            className={css({
              width: "100%",
              aspectRatio: media.ratio,
            })}
            src={media.url}
            alt={media.alt}
          />
          <Caption caption={media.caption} />
        </Fragment>
      ))}
    </VStack>
  ),
};

const mediaLandscapeContentSpec: MediaContentRenderSpec = {
  precidate: (content) => content.type === "landscape",
  render: ({ content }) => (
    <VStack
      width="full"
      justifyContent="flex-start"
      alignItems="flex-start"
      mx="auto"
      gap="5"
      maxWidth={{
        base: "full",
        lg: "landscape",
      }}
    >
      {content.mediaList.map((media) => (
        <Fragment>
          <styled.img
            className={css({
              width: "100%",
              aspectRatio: media.ratio,
            })}
            src={media.url}
            alt={media.alt}
          />
          <Caption caption={media.caption} />
        </Fragment>
      ))}
    </VStack>
  ),
};

const mediaDualContentSpec: MediaContentRenderSpec = {
  precidate: (content) => content.type === "dual",
  render: ({ content }) => (
    <Flex
      width="full"
      gap="10"
      flexDirection={{
        base: "column",
        lg: "row",
      }}
    >
      {content.mediaList.map((media) => (
        <Fragment>
          <VStack gap="5" flexGrow={1} flexBasis={0}>
            <styled.img
              className={css({
                width: "100%",
                aspectRatio: media.ratio,
              })}
              src={media.url}
              alt={media.alt}
            />
            <Caption caption={media.caption} />
          </VStack>
        </Fragment>
      ))}
    </Flex>
  ),
};

const mediaGridContentSpec: MediaContentRenderSpec = {
  precidate: (content) => content.type === "grid",
  render: ({ content }) => (
    <VStack width="full" gap="10">
      {content.name && (
        <Text
          as="h3"
          variant="heading3"
          className={css({
            textAlign: "left",
            width: "full",
          })}
        >
          {content.name}
        </Text>
      )}
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          lg: "1fr 1fr 1fr",
        }}
        gap="10"
        width="full"
      >
        {content.mediaList.map((media) => (
          <Fragment>
            <VStack gap="5" flexGrow={1} flexBasis={0}>
              <styled.img
                className={css({
                  width: "100%",
                  aspectRatio: media.ratio,
                })}
                src={media.url}
                alt={media.alt}
              />
              <Caption caption={media.caption} />
            </VStack>
          </Fragment>
        ))}
      </Box>
    </VStack>
  ),
};

const renderSpecs = [
  mediaFullWidthContentSpec,
  mediaLandscapeContentSpec,
  mediaDualContentSpec,
  mediaGridContentSpec,
] as const;

export type MediaViewProps = {
  content: SanitizedMediaContent;
};

export const MediaView = ({ content }: MediaViewProps) => {
  const Component = useMemo(() => {
    const spec = renderSpecs.find((spec) => spec.precidate(content));
    if (!spec) return (_: { content: SanitizedMediaContent }) => null;

    return spec.render;
  }, [content]);

  return <Component content={content} />;
};
