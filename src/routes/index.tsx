import { createFileRoute } from "@tanstack/react-router";
import { css, cx } from "styled/css";
import { Text } from "@/ui/base";
import Close from "@/ui/icons/close.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <div className={cx(css({ backgroundColor: "green.400" }), "difference")}>
        <Text variant="heading1">The National Ballet of Canada</Text>
        <Text variant="heading2">Heading 2</Text>
        <Text variant="heading3">Heading 3</Text>
        <Text variant="heading4">Heading 4</Text>
        <Text variant="subhead">Subhead</Text>
        <Text variant="smallSubhead">Small Subhead</Text>
        <Text variant="body">Body</Text>
        <Text variant="bodyStrong">Body Strong</Text>
        <Text variant="small">Small</Text>
        <Text variant="smallStrong">Small Strong</Text>
        <Text variant="buttonLarge">Button Large</Text>
        <Text variant="buttonLargeUnderline">Button Large Underline</Text>
        <Text variant="buttonSmall">Button Small</Text>
        <Text variant="buttonSmallUnderline">Button Small Underline</Text>
        <Close />
      </div>

      <div
        className={cx(
          css({
            backgroundColor: "white",
            height: "500px",
            width: "100%",
          }),
        )}
      ></div>

      <div
        className={cx(
          css({
            backgroundColor: "black",
            height: "500px",
            width: "100%",
          }),
        )}
      ></div>
    </>
  );
}
