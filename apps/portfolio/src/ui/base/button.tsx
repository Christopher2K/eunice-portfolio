import { Box, type BoxProps } from "styled/jsx";
import { type ButtonVariantProps, button } from "styled/recipes";

export type ButtonProps = BoxProps & ButtonVariantProps;

export const Button = ({
  size = "small",
  as = "button",
  underline = false,
  ...props
}: ButtonProps) => {
  return (
    <Box as={as} className={button({ size, underline })} {...props}>
      {props.children}
    </Box>
  );
};
