import { cva, type RecipeVariant } from "styled/css";

const textStyle = cva({
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
        size: "14px",
        lineHeight: 1.5,
        letterSpacing: "4%",
        textTransform: "uppercase",
      },
      smallSubhead: {
        fontFamily: "space",
        fontWeight: 400,
        size: "12px",
        lineHeight: 1.5,
        letterSpacing: "4%",
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
      buttonLarge: {
        fontFamily: "lausanne",
        fontWeight: 750,
        fontSize: "18px",
        lineHeight: 1.65,
        letterSpacing: "1%",
      },
      buttonLargeUnderline: {
        fontFamily: "lausanne",
        fontWeight: 750,
        fontSize: "18px",
        lineHeight: 1.65,
        letterSpacing: "1%",
        textDecoration: "underline",
      },
      buttonSmall: {
        fontFamily: "lausanne",
        fontWeight: 750,
        fontSize: "16px",
        lineHeight: 1.65,
        letterSpacing: "1%",
      },
      buttonSmallUnderline: {
        fontFamily: "lausanne",
        fontWeight: 750,
        fontSize: "16px",
        lineHeight: 1.65,
        letterSpacing: "1%",
        textDecoration: "underline",
      },
    },
  },
});

type TextVariant = RecipeVariant<typeof textStyle>["variant"];

type DistributiveOmit<T, U> = T extends unknown
  ? Pick<T, Exclude<keyof T, U>>
  : never;
type PropsOf<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>;

type PolymorphicProps<
  T extends React.ElementType = React.ElementType,
  TProps = {},
> = {
  as?: T;
} & TProps &
  DistributiveOmit<PropsOf<T>, keyof TProps | "as">;

type BaseTextProps = {
  variant: TextVariant;
};

type TextProps<T extends React.ElementType = React.ElementType> =
  PolymorphicProps<T, BaseTextProps>;

export const Text = ({ variant, as = "p", ...props }: TextProps) => {
  const Component = as ?? "p";
  return <Component className={textStyle({ variant })} {...props} />;
};
