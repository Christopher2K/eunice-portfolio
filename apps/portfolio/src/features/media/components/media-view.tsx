import {
  Fragment,
  type JSX,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { css } from "styled/css";
import { Box, Flex, styled, VStack } from "styled/jsx";
import { Text } from "@/ui/base";
import type { SanitizedMedia, SanitizedMediaContent } from "../media.types";

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

const useInView = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
};

type MediaItemProps = {
  media: SanitizedMedia;
};

const LazyVideo = ({
  media,
  className,
}: MediaItemProps & { className: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref, isInView } = useInView();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <styled.video
      ref={(node) => {
        videoRef.current = node;
        ref.current = node;
      }}
      className={className}
      src={media.url}
      poster={media.thumbnailURL ?? undefined}
      aria-label={media.alt}
      muted
      playsInline
      loop
      preload="none"
    />
  );
};

const MediaItem = ({ media }: MediaItemProps) => {
  const className = css({ width: "100%", aspectRatio: media.ratio });
  const isVideo = media.mimeType?.startsWith("video/");

  if (isVideo) {
    return <LazyVideo media={media} className={className} />;
  }

  return (
    <styled.img
      className={className}
      src={media.url}
      alt={media.alt}
      loading="lazy"
      decoding="async"
    />
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
        <Fragment key={media.id}>
          <MediaItem media={media} />
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
        <Fragment key={media.id}>
          <MediaItem media={media} />
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
        <Fragment key={media.id}>
          <VStack gap="5" flexGrow={1} flexBasis={0}>
            <MediaItem media={media} />
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
          variant={{
            base: "heading4",
            lg: "heading3",
          }}
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
          <Fragment key={media.id}>
            <VStack gap="5" flexGrow={1} flexBasis={0}>
              <MediaItem media={media} />
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
