import type { LinkContentBlock, QuoteContentBlock } from "@payload-types";
import type {
  SanitizedMedia,
  SanitizedMediaContent,
} from "../media/media.types";

export type LabelText = {
  type: "text";
  text: string;
};

export type LabelLink = {
  type: "link";
  url: string;
  text: string;
};

export type SanitizedQuoteContent = {
  __tag: "SanitizedQuoteContent";
  author: string;
  text: string;
  layout: QuoteContentBlock["layout"];
};

export type SanitizedLinkContent = {
  __tag: "SanitizedLinkContent";
  title: string;
  name: string;
  url: string;
  layout: LinkContentBlock["layout"];
};

export type SanitizedContent =
  | SanitizedMediaContent
  | SanitizedQuoteContent
  | SanitizedLinkContent;

export type SanitizedProject = {
  __tag: "SanitizedProject";
  id: number;
  name: string;
  description: string;
  labels?: Array<{ name: string; value: LabelText | LabelLink }>;
  mainImage: SanitizedMedia;
  content: Array<SanitizedContent>;
  projectType: string;
};

export const isSatitizedProject = (
  project: unknown,
): project is SanitizedProject =>
  project !== null &&
  typeof project === "object" &&
  "__tag" in project &&
  project?.__tag === "SanitizedProject";
