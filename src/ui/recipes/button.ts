import { defineRecipe } from "@pandacss/dev";
import { textRecipe } from "./text";

console.log(textRecipe.variants?.variant.buttonSmall);

export const buttonRecipe = defineRecipe({
  className: "button",
  description: "Button styles in the design system",
  base: {
    _hover: {
      opacity: 0.5,
      cursor: "pointer",
    },
  },
  variants: {
    size: {
      small: {
        ...(textRecipe.variants?.variant.buttonSmall ?? {}),
      },
      large: {
        ...(textRecipe.variants?.variant.buttonLarge ?? {}),
      },
      xlarge: {
        ...(textRecipe.variants?.variant.buttonXlarge ?? {}),
      },
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
