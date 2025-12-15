import type { Media, MediaContentBlock } from "@payload-types";

export type SanitizedMedia = Omit<Media, "url"> & {
  url: string;
};

export type SanitizedMediaContent = {
  name?: string;
  showCaptions?: boolean;
  type: MediaContentBlock["type"];
  mediaList: Array<SanitizedMedia>;
};
