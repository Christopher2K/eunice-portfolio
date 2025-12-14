import type { SanitizedMedia } from "../media/media.types";

export type SanitizedProject = {
  __tag: "SanitizedProject";
  id: number;
  name: string;
  description: string;
  labels?: Array<{ name: string; value: string }>;
  mainImage?: SanitizedMedia;
};

export const isSatitizedProject = (
  project: unknown,
): project is SanitizedProject =>
  project !== null &&
  typeof project === "object" &&
  "__tag" in project &&
  project?.__tag === "SanitizedProject";
