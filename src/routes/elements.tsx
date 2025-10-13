import { createFileRoute } from "@tanstack/react-router";
import { css, cx } from "styled/css";
import { Text } from "@/ui/base";
import CloseIcon from "@/ui/icons/close.svg";
import DragHandleIcon from "@/ui/icons/drag-handle.svg";

export const Route = createFileRoute("/elements")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={cx(css({ backgroundColor: "teal.300" }))}>
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
      <CloseIcon />
      <DragHandleIcon />
    </div>
  );
}
