import type { Media } from "@payload-types";

export type SanitizedMedia = Omit<Media, "url"> & {
  url: string;
};
