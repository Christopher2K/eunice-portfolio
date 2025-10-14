import { cx } from "styled/css";
import { type TextVariantProps, text } from "styled/recipes";

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

type BaseTextProps = TextVariantProps;

type TextProps<T extends React.ElementType = React.ElementType> =
  PolymorphicProps<T, BaseTextProps>;

export const Text = <T extends React.ElementType = "p">({
  variant,
  as,
  className,
  ...props
}: TextProps<T>) => {
  const Component = as ?? "p";
  return <Component className={cx(text({ variant }), className)} {...props} />;
};
