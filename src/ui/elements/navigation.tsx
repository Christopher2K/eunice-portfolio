import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { css } from "styled/css";
import { Box, HStack, styled, VStack } from "styled/jsx";
import { Text } from "../base";
import CloseIcon from "../icons/close.svg";
import DragHandleIcon from "../icons/drag-handle.svg";

export const Navigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((v) => !v);

  const navLinks = [
    {
      name: "Work",
      href: "/work",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Sandbox",
      href: "/sandbox",
    },
  ] as const;

  const mobileNavLinks = [
    {
      name: "Home",
      href: "/",
    },
    ...navLinks,
  ] as const;

  useEffect(
    () =>
      router.subscribe("onLoad", () => {
        setIsOpen(false);
      }),
    [router],
  );

  return (
    <styled.nav
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      width="full"
      height={isOpen ? "100%" : "auto"}
      position={isOpen ? "fixed" : "sticky"}
      backgroundColor={isOpen ? "#28381F" : "transparent"}
      top={0}
      left={0}
      zIndex={100}
      color="white"
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        gap="10"
        width="full"
        px="5"
        py="6"
      >
        <Link
          to="/"
          className={css({
            display: "block",
            flexGrow: 1,
            flexBasis: 0,
            _hover: {
              opacity: 0.5,
              cursor: "pointer",
            },
          })}
        >
          <Text variant="buttonLarge" className={css({ whiteSpace: "nowrap" })}>
            Eunice Tchitchiama
          </Text>
        </Link>

        <Box
          hideFrom="lg"
          as="button"
          // @ts-expect-error
          type="button"
          _hover={{ opacity: 0.5 }}
          cursor="pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <CloseIcon /> : <DragHandleIcon />}
        </Box>

        <HStack
          hideBelow="lg"
          justifyContent="space-between"
          alignItems="center"
          flexGrow="1"
          flexBasis="0"
        >
          <Text variant="bodyStrong">
            Art direction, Graphic & Digital Design
          </Text>

          <HStack gap="5">
            {navLinks.map((link) => (
              <Box as="li" key={link.name} listStyle="none">
                <Link
                  key={link.name}
                  to={link.href}
                  className={css({
                    _hover: {
                      opacity: 0.5,
                      cursor: "pointer",
                    },
                  })}
                >
                  <Text variant="buttonLarge">{link.name}</Text>
                </Link>
              </Box>
            ))}
          </HStack>
        </HStack>
      </HStack>

      {isOpen && (
        <HStack
          hideFrom="lg"
          justifyContent="flex-start"
          alignItems="flex-start"
          backgroundColor="#28381F"
          width="full"
          flexGrow={1}
          alignSelf="stretch"
        >
          <VStack
            as="ul"
            justifyContent="flex-start"
            alignItems="center"
            listStyle="none"
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            width="full"
            gap="5"
          >
            {mobileNavLinks.map((link) => (
              <styled.li key={link.name}>
                <Link
                  to={link.href}
                  className={css({
                    _hover: {
                      opacity: 0.5,
                      cursor: "pointer",
                    },
                  })}
                >
                  <Text variant="heading3">{link.name}</Text>
                </Link>
              </styled.li>
            ))}
          </VStack>

          <VStack
            width="full"
            gap="1"
            justifyContent="flex-end"
            alignItems="flex-start"
            alignSelf="flex-end"
            paddingInline="5"
            paddingTop="5"
            paddingBottom="10"
          >
            <Text variant="smallSubhead">Contact: </Text>
            <styled.a href="mailto:e.tchitchiama@gmail.com">
              <Text as="span" variant="buttonSmall">
                e.tchitchiama@gmail.com
              </Text>
            </styled.a>
          </VStack>
        </HStack>
      )}
    </styled.nav>
  );
};
