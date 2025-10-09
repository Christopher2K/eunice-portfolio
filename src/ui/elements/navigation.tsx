import { Link } from "@tanstack/react-router";
import { HStack } from "styled/jsx";
import { Button, Text } from "../base";

export const Navigation = () => {
  return (
    <HStack width="full" px="10" py="7">
      <HStack flexBasis="0" flexGrow="1" flexShrink="1">
        <Link to="/">
          <Button size="large">Eunice Tchitchiama</Button>
        </Link>
      </HStack>

      <HStack
        flexBasis="0"
        flexGrow="1"
        flexShrink="1"
        justifyContent="space-between"
      >
        <Text variant="bodyStrong">
          Art direction, Graphic & Digital Design
        </Text>

        <HStack as="ul" gap="5">
          <li>
            <Link to="/work">
              <Button as="span" size="large">
                Work
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Button as="span" size="large">
                About
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/sandbox">
              <Button as="span" size="large">
                Sandbox
              </Button>
            </Link>
          </li>
        </HStack>
      </HStack>
    </HStack>
  );
};
