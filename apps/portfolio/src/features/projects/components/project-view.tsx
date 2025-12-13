import { Link } from "@tanstack/react-router";
import { css } from "styled/css";
import { Box, Flex, styled, VStack } from "styled/jsx";
import { MediaView } from "@/features/media/components/media-view";
import type {
  MediaDualPresentation,
  MediaFullWidthPresentation,
  MediaGridPresentation,
  MediaLandscapePresentation,
  MediaPortraitPresentation,
} from "@/features/media/media.types";
import { Button, Text } from "@/ui/base";

export const Project = {
  mainImage: "https://picsum.photos/seed/eunice/1920/1080",
  mainImageAlt: "Eunice",
  title: "The National Ballet of Canada",

  client: "The National Ballet of Canada",
  agency: "Bruce Mau Design",
  website: "https://www.google.ca",
  description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus eu lectus in blandit. 
Praesent finibus turpis ac fringilla aliquam. Sed ut lobortis tellus, tempus mollis mi. Donec quis imperdiet ex. Ut sed viverra ipsum. 
Cras placerat nibh ut dolor rhoncus, nec scelerisque dui iaculis. Cras interdum diam arcu, eu imperdiet justo ultricies sit amet. 

Sed magna elit, gravida at mollis tempus, ullamcorper et lectus. Phasellus feugiat purus a nisl aliquam, a porta leo commodo. Morbi volutpat mauris sed sem imperdiet, ac hendrerit leo porttitor. Nunc aliquam ipsum suscipit felis aliquam, quis tincidunt nisl consectetur. Etiam malesuada purus rhoncus dignissim ultricies. Proin ac ultricies eros, sit amet commodo nibh.
  `,
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

export const ProjectView = () => {
  const projectDefinitionList = [
    { label: "Client", value: Project.client },
    { label: "Agency", value: Project.agency },
    { label: "Website", value: Project.website },
  ];

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
          aspectRatio: "16/9",
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
        src={Project.mainImage}
        alt={Project.mainImageAlt}
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
            {Project.title}
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
            {projectDefinitionList.map(({ label, value }) => (
              <VStack
                key={label}
                gap="1"
                width={{
                  base: "full",
                  lg: "auto",
                }}
                justifyContent="flex-start"
                alignItems="flex-start"
                flexBasis={{
                  lg: "0",
                }}
                flexGrow={{
                  lg: "1",
                }}
              >
                <Text as="dt" variant={{ base: "smallSubhead", lg: "subhead" }}>
                  {label}
                </Text>
                <Text as="dd" variant={{ base: "small", lg: "body" }}>
                  {value}
                </Text>
              </VStack>
            ))}
          </Flex>

          <Box width="full">
            <Text as="p" variant={{ base: "small", lg: "body" }}>
              {Project.description}
            </Text>
          </Box>
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
