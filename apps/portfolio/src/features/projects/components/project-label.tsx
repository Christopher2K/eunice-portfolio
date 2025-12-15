import { useMemo } from "react";
import { css } from "styled/css";
import { VStack } from "styled/jsx";
import { Text } from "@/ui/base";
import type { LabelLink, LabelText } from "../projects.types";

type ProjectLabelProps = {
  name: string;
  value: LabelText | LabelLink;
};
export const ProjectLabel = ({ name, value }: ProjectLabelProps) => {
  const content = useMemo(() => {
    if (value.type === "link") {
      return (
        <dd>
          <Text
            as="a"
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            variant={{ base: "small", lg: "body" }}
            className={css({ textDecoration: "underline" })}
          >
            {value.text}
          </Text>
        </dd>
      );
    }

    return (
      <Text as="dd" variant={{ base: "small", lg: "body" }}>
        {value.text}
      </Text>
    );
  }, [value]);

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
      {content}
    </VStack>
  );
};
