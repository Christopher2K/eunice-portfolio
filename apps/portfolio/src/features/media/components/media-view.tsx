import { type JSX, useMemo } from "react";
import { css } from "styled/css";
import { Box, styled, VStack } from "styled/jsx";
import { Text } from "@/ui/base";
import type {
  MediaDualPresentation,
  MediaFullWidthPresentation,
  MediaGridPresentation,
  MediaLandscapePresentation,
  MediaPortraitPresentation,
  MediaPresentation,
} from "../media.types";

type MediaPresentationRenderSpec<R extends MediaPresentation> = {
  precidate: (presentation: MediaPresentation) => presentation is R;
  render: (props: { presentation: R }) => JSX.Element;
};

const medialFullWidthPresentationSpec: MediaPresentationRenderSpec<MediaFullWidthPresentation> =
  {
    precidate: (presentation) => presentation.variant === "FULL_WIDTH",
    render: ({ presentation }) => (
      <VStack
        width="full"
        gap="5"
        justifyContent="flex-start"
        alignItems="flex-start"
        color="text"
      >
        <styled.img
          className={css({
            width: "100%",
            aspectRatio: presentation.media.format,
          })}
          src={presentation.media.src}
          alt={presentation.media.altText}
        />
        {presentation.media.title && (
          <Text variant="small">{presentation.media.title}</Text>
        )}
      </VStack>
    ),
  };

const medialLandscapePresentationSpec: MediaPresentationRenderSpec<MediaLandscapePresentation> =
  {
    precidate: (presentation) => presentation.variant === "LANDSCAPE",
    render: (presentation) => <div>Landscape</div>,
  };

const medialPortraitPresentationSpec: MediaPresentationRenderSpec<MediaPortraitPresentation> =
  {
    precidate: (presentation) => presentation.variant === "PORTRAIT",
    render: ({ presentation }) => (
      <VStack
        width="full"
        gap="5"
        justifyContent="center"
        alignItems="center"
        color="text"
      >
        <Box
          className={css({
            display: "inline-block",
            width: {
              base: "100%",
              lg: "50%",
            },
          })}
        >
          <styled.img
            className={css({
              width: "100%",
              aspectRatio: presentation.media.format,
            })}
            src={presentation.media.src}
            alt={presentation.media.altText}
          />
          {presentation.media.title && (
            <Box mt="5">
              <Text variant="small">{presentation.media.title}</Text>
            </Box>
          )}
        </Box>
      </VStack>
    ),
  };

const medialDualPresentationSpec: MediaPresentationRenderSpec<MediaDualPresentation> =
  {
    precidate: (presentation) => presentation.variant === "DUAL",
    render: (presentation) => <div>Dual</div>,
  };

const medialGridPresentationSpec: MediaPresentationRenderSpec<MediaGridPresentation> =
  {
    precidate: (presentation) => presentation.variant === "GRID",
    render: (presentation) => <div>Grid</div>,
  };

const renderSpecs = [
  medialFullWidthPresentationSpec,
  medialLandscapePresentationSpec,
  medialPortraitPresentationSpec,
  medialDualPresentationSpec,
  medialGridPresentationSpec,
] as const;

export type MediaViewProps = {
  presentation: MediaPresentation;
};

export const MediaView = ({ presentation }: MediaViewProps) => {
  const Component = useMemo(() => {
    const spec = renderSpecs.find((spec) => spec.precidate(presentation));
    if (!spec)
      throw new Error(
        `No render spec found for presentation ${JSON.stringify(presentation)}`,
      );

    return spec.render;
  }, [presentation]);

  // @ts-expect-error
  return <Component presentation={presentation} />;
};
