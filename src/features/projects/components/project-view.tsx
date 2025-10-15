import { Link } from "@tanstack/react-router";
import { css } from "styled/css";
import { Box, Flex, styled, VStack } from "styled/jsx";
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
