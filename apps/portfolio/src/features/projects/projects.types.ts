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

export type SanitizedProject = {
  __tag: "SanitizedProject";
  id: number;
  name: string;
  description: string;
  labels?: Array<{ name: string; value: LabelText | LabelLink }>;
  mainImage: SanitizedMedia;
  medium?: Array<SanitizedMediaContent>;
  projectType: string;
};

export const isSatitizedProject = (
  project: unknown,
): project is SanitizedProject =>
  project !== null &&
  typeof project === "object" &&
  "__tag" in project &&
  project?.__tag === "SanitizedProject";
