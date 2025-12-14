import type { Media } from "@payload-types";
import { Link } from "@tanstack/react-router";
import { css, cx } from "styled/css";
import { Box, Flex, styled, VStack } from "styled/jsx";
import { text } from "styled/recipes";
import { env } from "@/env";
import { MediaView } from "@/features/media/components/media-view";
import type {
  MediaDualPresentation,
  MediaFullWidthPresentation,
  MediaGridPresentation,
  MediaPortraitPresentation,
} from "@/features/media/media.types";
import { Button, Text } from "@/ui/base";
import { ProjectLabel } from "./project-label";

export const Project = {
  mediaPresentations: [
    {
      id: "mp_fw_7k3n9x2m",
      variant: "FULL_WIDTH",
      media: {
        id: "mp_fw_7k3n9x2m-1",
        variant: "image",
        format: "16/9",
        src: "https://picsum.photos/seed/project1/1920/1080",
        altText: "Full width landscape showcase",
        title: "Project overview",
      },
    } satisfies MediaFullWidthPresentation,
    // {
    //   id: "mp_ls_5q8r1w4t",
    //   variant: "LANDSCAPE",
    //   media: {
    //     id: "mp_ls_5q8r1w4t-1",
    //     variant: "image",
    //     format: "4/3",
    //     src: "https://picsum.photos/seed/project2/1200/900",
    //     altText: "Landscape format presentation",
    //     title: "Design process",
    //   },
    // } satisfies MediaLandscapePresentation,
    {
      id: "mp_pt_9h6j3v8s",
      variant: "PORTRAIT",
      media: {
        id: "mp_pt_9h6j3v8s-1",
        variant: "image",
        format: "3/4",
        src: "https://picsum.photos/seed/project3/800/1067",
        altText: "Portrait format showcase",
        title: "Mobile interface",
      },
    } satisfies MediaPortraitPresentation,
    {
      id: "mp_dl_2b4f7n1z",
      variant: "DUAL",
      medium: [
        {
          id: "mp_dl_2b4f7n1z-1",
          variant: "image",
          format: "1/1",
          src: "https://picsum.photos/seed/dual1/800/800",
          altText: "First dual image",
          title: "Before",
        },
        {
          id: "mp_dl_2b4f7n1z-2",
          variant: "image",
          format: "1/1",
          src: "https://picsum.photos/seed/dual2/800/800",
          altText: "Second dual image",
          title: "After",
        },
      ],
    } satisfies MediaDualPresentation,
    {
      id: "mp_gr_8m3p6y5k",
      variant: "GRID",
      media: [
        {
          id: "mp_gr_8m3p6y5k-1",
          variant: "image",
          format: "2/3",
          src: "https://picsum.photos/seed/grid1/600/900",
          altText: "Grid item 1",
          title: "Detail view 1",
        },
        {
          id: "mp_gr_8m3p6y5k-2",
          variant: "image",
          format: "1/1",
          src: "https://picsum.photos/seed/grid2/800/800",
          altText: "Grid item 2",
          title: "Detail view 2",
        },
        {
          id: "mp_gr_8m3p6y5k-3",
          variant: "video",
          format: "16/9",
          src: "https://picsum.photos/seed/grid3/1280/720",
          altText: "Video demonstration",
          title: "Interactive demo",
        },
        {
          id: "mp_gr_8m3p6y5k-4",
          variant: "image",
          format: "4/3",
          src: "https://picsum.photos/seed/grid4/1200/900",
          altText: "Grid item 4",
          title: "Final result",
        },
      ],
    } satisfies MediaGridPresentation,
  ],
};

export type ProjectViewProps = {
  name: string;
  labels: Array<{ name: string; value: string }>;
  description: string;
  mainImage: Media;
};
export const ProjectView = ({
  name,
  labels,
  description,
  mainImage,
}: ProjectViewProps) => {
  return (
    <VStack
      width="full"
      justifyContent="flex-start"
      alignItems="flex-start"
      color="text"
      gap="0"
    >
      <styled.img
        className={css({
          aspectRatio: mainImage.ratio,
          width: "100%",
          padding: {
            base: "5",
            lg: "10",
          },
          paddingBottom: {
            base: "5",
            lg: "0",
          },
        })}
        src={`${env.VITE_PAYLOAD_URL}/${mainImage.url}`}
        alt={mainImage.alt}
      />
      <Flex
        flexDirection={{
          base: "column",
          lg: "row",
        }}
        width="full"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="10"
        pt="10"
        pb={{
          base: "10",
          lg: "120px",
        }}
        px={{
          base: "5",
          lg: "10",
        }}
      >
        <Box
          width={{
            base: "full",
            lg: "auto",
          }}
          flexBasis={{
            base: "full",
            lg: "0",
          }}
          flexGrow={{
            lg: "1",
          }}
        >
          <Text
            as="h1"
            variant={{
              base: "heading3",
              lg: "heading1",
            }}
          >
            {name}
          </Text>
        </Box>

        <VStack
          width={{
            base: "full",
            lg: "auto",
          }}
          flexBasis={{
            lg: "0",
          }}
          flexGrow={{
            lg: "1",
          }}
          gap={{
            base: "10",
            lg: "100px",
          }}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Flex
            flexDirection={{
              base: "column",
              lg: "row",
            }}
            as="dl"
            justifyContent="flex-start"
            alignItems="flex-start"
            width="full"
            gap={{
              base: "5",
              lg: "10",
            }}
          >
            {labels.map(({ name, value }) => (
              <ProjectLabel key={name} name={name} value={value} />
            ))}
          </Flex>

          <Box
            width="full"
            className={cx(
              css({
                whiteSpace: "pre-wrap",
              }),
              text({ variant: { base: "small", lg: "bodyStrong" } }),
            )}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: This is injecting stuff from the CMS
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </VStack>
      </Flex>

      <VStack
        width="full"
        justifyContent="flex-start"
        alignItems="flex-start"
        px="10"
      >
        {Project.mediaPresentations.map((presentation) => (
          <MediaView key={presentation.id} presentation={presentation} />
        ))}
      </VStack>

      <VStack
        py="10"
        px="5"
        justifyContent="flex-start"
        alignItems="center"
        width="full"
      >
        <Text variant={{ base: "smallSubhead", lg: "subhead" }}>
          See it live
        </Text>
        <Link
          href={Project.website}
          to={Project.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button as="span" size={{ base: "large", lg: "xlarge" }} underline>
            Visit the website now
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
};
