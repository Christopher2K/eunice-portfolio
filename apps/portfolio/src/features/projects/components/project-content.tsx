import type { JSX } from "react";
import type { SanitizedContent } from "../projects.types";

type ProjectContentRenderSpec<
  T extends SanitizedContent,
  R extends SanitizedContent,
> = {
  precidate: (content: T) => content is R;
  render: (props: { content: R }) => JSX.Element;
};

export type ProjectContentProps = {
  content: SanitizedContent;
};

export const ProjectContent = ({}: ProjectContentProps) => {
  return <div>ProjectContent</div>;
};
