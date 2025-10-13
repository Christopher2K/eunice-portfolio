import { Box, Flex, styled, VStack } from "styled/jsx";
import { Divider, Text } from "../base";

export const Footer = () => {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://twitter.com/eunice_tchithama",
    },
    {
      name: "LinkedIn",
      href: "https://twitter.com/eunice_tchithama",
    },
    {
      name: "SoundCloud",
      href: "https://www.instagram.com/eunice_tchithama",
    },
  ];

  return (
    <Box as="footer" color="white" width="full" pb="10" px="5">
      <Divider mb="10" />

      <Flex
        width="full"
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={{
          base: "5",
          lg: "10",
        }}
      >
        <VStack
          flexGrow={1}
          flexBasis={0}
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="1"
        >
          <Text variant="smallSubhead">Contact : </Text>
          <styled.a
            href="mailto:e.tchitchiama@gmail.com"
            _hover={{ opacity: 0.5 }}
          >
            <Text as="span" variant="buttonSmall">
              e.tchitchiama@gmail.com
            </Text>
          </styled.a>
        </VStack>

        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          flexGrow={1}
          flexBasis={0}
          justifyContent="flex-start"
          alignItems={{
            base: "flex-start",
            lg: "flex-end",
          }}
          gap="10"
          as="section"
        >
          <VStack
            flexGrow={1}
            flexBasis={0}
            justifyContent="flex-start"
            alignItems="flex-start"
            gap="1"
          >
            <Text variant="smallSubhead">Follow : </Text>

            <Flex
              as="ul"
              flexDirection={{ base: "column", lg: "row" }}
              gap={{
                base: "1",
                lg: "5",
              }}
              width="full"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {socialLinks.map((link) => (
                <styled.li key={link.name}>
                  <styled.a href={link.href} _hover={{ opacity: 0.5 }}>
                    <Text as="span" variant="buttonSmall">
                      {link.name}
                    </Text>
                  </styled.a>
                </styled.li>
              ))}
            </Flex>
          </VStack>
          <Text variant="bodyStrong">
            All rights reserved ©{new Date().getFullYear()}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
