import { useCallback } from "react";
import { css } from "styled/css";
import { VStack } from "styled/jsx";
import { Text } from "@/ui/base";

const isUrl = (value: unknown): boolean => {
  try {
    new URL(value as string);
    return true;
  } catch (_) {
    return false;
  }
};

type ProjectLabelProps = {
  name: string;
  value: string;
};
export const ProjectLabel = ({ name, value }: ProjectLabelProps) => {
  const renderString = useCallback((value: string) => {
    if (isUrl(value)) {
      return (
        <dd>
          <Text
            as="a"
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            variant={{ base: "small", lg: "body" }}
            className={css({ textDecoration: "underline" })}
          >
            {value}
          </Text>
        </dd>
      );
    } else {
      <Text as="dd" variant={{ base: "small", lg: "body" }}>
        {value}
      </Text>;
    }

    return value;
  }, []);

  return (
    <VStack
      key={name}
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
        {name}
      </Text>
      {renderString(value)}
    </VStack>
  );
};
