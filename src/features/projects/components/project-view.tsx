import { Link } from "@tanstack/react-router";
import { css } from "styled/css";
import { Box, styled, VStack } from "styled/jsx";
import { Button, Text } from "@/ui/base";

export const Project = {
  mainImage: "https://picsum.photos/seed/eunice/1920/1080",
  mainImageAlt: "Eunice",
  title: "The National Ballet of Canada",

  client: "The National Ballet of Canada",
  agency: "Bruce Mau Design",
  website: "https://www.eunice.ca",
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
    >
      <styled.img
        className={css({
          aspectRatio: "16/9",
          width: "100%",
          padding: "5",
        })}
        src={Project.mainImage}
        alt={Project.mainImageAlt}
      />
      <VStack
        width="full"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="10"
        px="5"
        py="10"
      >
        <Text as="h1" variant="heading3">
          {Project.title}
        </Text>

        <VStack
          as="dl"
          justifyContent="flex-start"
          alignItems="flex-start"
          width="full"
        >
          {projectDefinitionList.map(({ label, value }) => (
            <VStack
              key={label}
              gap="1"
              width="full"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Text as="dt" variant="smallSubhead">
                {label}
              </Text>
              <Text as="dd" variant="small">
                {value}
              </Text>
            </VStack>
          ))}
        </VStack>

        <Box width="full">
          <Text as="p" variant="small">
            {Project.description}
          </Text>
        </Box>
      </VStack>

      <VStack
        py="10"
        px="5"
        justifyContent="flex-start"
        alignItems="center"
        width="full"
      >
        <Text variant="smallSubhead">See it live</Text>
        <Link href={Project.website} to={Project.website}>
          <Button as="span" size="large" textDecoration="underline">
            Visit the website now
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
};
