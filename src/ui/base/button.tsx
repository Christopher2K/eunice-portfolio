import { cva, type RecipeVariant } from "styled/css";
import { Box, type BoxProps } from "styled/jsx";
import { Text } from "./text";

const buttonStyle = cva({
  base: {
    _hover: {
      opacity: 0.5,
      cursor: "pointer",
    },
  },
  variants: {
    size: {
      small: {},
      large: {},
    },
    underline: {
      true: {
        textDecoration: "underline",
      },
    },
  },
  defaultVariants: {
    size: "small",
  },
});

type SizeVariant = RecipeVariant<typeof buttonStyle>["size"];

export type ButtonProps = {
  size?: SizeVariant;
} & BoxProps;

export const Button = ({
  size = "small",
  as = "button",
  ...props
}: ButtonProps) => {
  return (
    <Box as={as} className={buttonStyle({ size })} {...props}>
      <Text
        variant={size === "small" ? "buttonSmall" : "buttonLarge"}
        as="span"
      >
        {props.children}
      </Text>
    </Box>
  );
};
