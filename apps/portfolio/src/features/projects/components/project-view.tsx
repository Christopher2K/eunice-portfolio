import { Link } from "@tanstack/react-router";
import { css, cx } from "styled/css";
import { Box, Flex, Stack, styled, VStack } from "styled/jsx";
import { text } from "styled/recipes";
import { MediaItem } from "@/features/media/components/media-item";
import { MediaView } from "@/features/media/components/media-view";
import { Text } from "@/ui/base";
import type { SanitizedProject } from "../projects.types";
import { ProjectContent } from "./project-content";
import { ProjectLabel } from "./project-label";

export type ProjectViewProps = {
  project: SanitizedProject;
};
export const ProjectView = ({
  project: { name, labels, description, mainImage, content, nextProject },
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
        <Box
          width="full"
          className={css({
            padding: {
              base: "5",
              lg: "10",
            },
            paddingBottom: {
              base: "5",
              lg: "0",
            },
          })}
        >
          <MediaItem media={mainImage} />
        </Box>
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
            className={css({
              marginTop: {
                lg: "-16px",
              },
            })}
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

          {nextProject && (
            <Link to="/work/$projectId" params={{ projectId: nextProject.id }}>
              <VStack
                width="full"
                py={{
                  base: "20",
                  lg: "32",
                }}
                gap={{
                  base: "10",
                  lg: "32",
                }}
              >
                <styled.hr borderColor="white" width="full" opacity={0.3} />
                <Stack
                  display="flex"
                  width="full"
                  gap="10"
                  flexDirection={{
                    base: "column",
                    lg: "row",
                  }}
                >
                  <VStack
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    flexGrow="5"
                    flexShrink="0"
                    flexBasis="0"
                  >
                    <Text
                      variant={{
                        base: "smallSubhead",
                        lg: "subhead",
                      }}
                    >
                      Next project
                    </Text>
                    <Text
                      variant={{
                        base: "heading3",
                        lg: "heading1",
                      }}
                    >
                      {nextProject.name}
                    </Text>
                  </VStack>

                  <Box flexGrow="7" flexShrink="0" flexBasis="0">
                    <MediaItem media={nextProject.mainImage} loading="lazy" />
                  </Box>
                </Stack>
              </VStack>
            </Link>
          )}
        </VStack>
      )}
    </VStack>
  );
};
