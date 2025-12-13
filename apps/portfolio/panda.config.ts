import {
  defineConfig,
  defineGlobalFontface,
  defineGlobalStyles,
  defineRecipe,
} from "@pandacss/dev";

export const textRecipe = defineRecipe({
  className: "text",
  description: "Text styles in the design system",
  base: {},
  variants: {
    variant: {
      heading1: {
        fontFamily: "lausanne",
        fontWeight: 300,
        fontSize: "80px",
        lineHeight: 1.5,
        letterSpacing: "-2%",
      },
      heading2: {
        fontFamily: "lausanne",
        fontWeight: 300,
        fontSize: "64px",
        lineHeight: 1.5,
      },
      heading3: {
        fontFamily: "lausanne",
        fontWeight: 300,
        fontSize: "48px",
        lineHeight: 1.5,
      },
      heading4: {
        fontFamily: "lausanne",
        fontWeight: 300,
        fontSize: "32px",
        lineHeight: 1.5,
      },
      subhead: {
        fontFamily: "space",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: 1.5,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      },
      smallSubhead: {
        fontFamily: "space",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: 1.5,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      },
      xsmallSubhead: {
        fontFamily: "space",
        fontWeight: 400,
        fontSize: "10px",
        lineHeight: 1.5,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      },
      body: {
        fontFamily: "lausanne",
        fontWeight: 300,
        fontSize: "18px",
        lineHeight: 1.75,
        letterSpacing: "2%",
      },
      bodyStrong: {
        fontFamily: "lausanne",
        fontWeight: 750,
        fontSize: "20px",
        lineHeight: 1.65,
        letterSpacing: "1%",
      },
      small: {
        fontFamily: "lausanne",
        fontWeight: 300,
        fontSize: "16px",
        lineHeight: 1.75,
      },
      smallStrong: {
        fontFamily: "lausanne",
        fontWeight: 750,
        fontSize: "16px",
        lineHeight: 1.75,
      },
      buttonXlarge: {
        fontFamily: "lausanne",
        fontWeight: 300,
        fontSize: "32px",
        lineHeight: 1.65,
        letterSpacing: "1%",
      },
      buttonLarge: {
        fontFamily: "lausanne",
        fontWeight: 750,
        fontSize: "18px",
        lineHeight: 1.65,
        letterSpacing: "1%",
      },
      buttonSmall: {
        fontFamily: "lausanne",
        fontWeight: 750,
        fontSize: "16px",
        lineHeight: 1.65,
        letterSpacing: "1%",
      },
    },
  },
});

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

const globalFontface = defineGlobalFontface({
  "Space Mono": [
    {
      src: 'url(/fonts/SpaceMono-Regular.woff2) format("woff2")',
      fontWeight: 400,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
  ],
  "TWK Lausanne": [
    {
      src: 'url(/fonts/TWKLausanne-300.woff2) format("woff2")',
      fontWeight: 300,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
    {
      src: 'url(/fonts/TWKLausanne-750.woff2) format("woff2")',
      fontWeight: 750,
      fontStyle: "normal",
      fontDisplay: "swap",
    },
  ],
});

const globalCss = defineGlobalStyles({
  "*": {
    fontFamily: "TWK Lausanne, Space Mono, monospace",
    fontWeight: 300,
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
  },
  "html, body": {
    backgroundColor: "var(--colors-background)",
  },
});

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  syntax: "object-literal",
  globalFontface,
  globalCss,
  globalVars: {
    "--font-lausanne": "TWK Lausanne, monospace",
    "--font-space-mono": "Space Mono, monospace",
  },
  theme: {
    breakpoints: {
      lg: "1410px",
    },
    extend: {
      recipes: {
        text: textRecipe,
        button: buttonRecipe,
      },
      tokens: {
        fonts: {
          lausanne: { value: "var(--font-lausanne), monospace" },
          space: { value: "var(--font-space-mono), sans-serif" },
        },
        colors: {
          background: {
            value: "#000000",
          },
          "menu-background": {
            value: "#28381F",
          },
          text: {
            value: "#FFFFFF",
          },
          border: {
            value: "#FFFFFF",
          },
        },
      },
    },
  },
  outdir: "styled-system",
});
