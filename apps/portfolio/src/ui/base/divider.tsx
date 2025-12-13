import type { ComponentProps } from "react";
import { styled } from "styled/jsx";

type DividerProps = ComponentProps<typeof styled.hr>;
export const Divider = (props: DividerProps) => {
  return (
    <styled.hr
      width="full"
      height="1px"
      backgroundColor="border"
      opacity="0.3"
      {...props}
    />
  );
};
