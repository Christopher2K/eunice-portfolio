import { cx } from "styled/css";
import { type ButtonVariantProps, button } from "styled/recipes";

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

type BaseButtonProps = ButtonVariantProps;

export type ButtonProps<T extends React.ElementType = React.ElementType> =
  PolymorphicProps<T, BaseButtonProps>;

export const Button = <T extends React.ElementType = "button">({
  size = "small",
  variant = "primary",
  as,
  className,
  ...props
}: ButtonProps<T>) => {
  const Component = as ?? "button";
  return (
    <Component
      className={cx(button({ size, variant }), className)}
      {...props}
    />
  );
};
