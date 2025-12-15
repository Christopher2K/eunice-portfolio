import { css, cx } from "styled/css";
import { Box, Flex, styled, VStack } from "styled/jsx";
import { text } from "styled/recipes";
import { Text } from "@/ui/base";
import type { SanitizedProject } from "../projects.types";
import { ProjectContent } from "./project-content";
import { ProjectLabel } from "./project-label";

export type ProjectViewProps = {
  project: SanitizedProject;
};
export const ProjectView = ({
  project: { name, labels, description, mainImage, content },
}: ProjectViewProps) => {
  return (
    <VStack
      width="full"
      justifyContent="flex-start"
      alignItems="flex-start"
      color="text"
      gap="0"
    >
      {mainImage && (
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
          src={mainImage.url}
          alt={mainImage.alt}
        />
      )}
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
          {labels && labels.length > 0 && (
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
          )}
          <Box
            width="full"
            className={cx(
              css({
                whiteSpace: "pre-wrap",
              }),
              text({ variant: { base: "small", lg: "bodyStrong" } }),
            )}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Intentional
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </VStack>
      </Flex>
      {content && content.length > 0 && (
        <VStack
          width="full"
          justifyContent="flex-start"
          alignItems="flex-start"
          px={{
            base: "5",
            lg: "10",
          }}
        >
          {content.map((item, index) => (
            <ProjectContent
              // biome-ignore lint/suspicious/noArrayIndexKey: Not dynamic anyway
              key={index}
              content={item}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
};
