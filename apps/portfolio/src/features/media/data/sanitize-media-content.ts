import type { MediaContentBlock } from "@payload-types";
import type { SanitizedMedia, SanitizedMediaContent } from "../media.types";
import { sanitizeMedia } from "./sanitize-media";

export const sanitizeMediaContent = (
  mediaContent: MediaContentBlock | number,
): SanitizedMediaContent => {
  if (typeof mediaContent === "number")
    throw new Error("MediaContent is missing");

  const mediaList =
    mediaContent.mediaList?.reduce((finalList, media) => {
      if (typeof media !== "number") {
        const sanitizedMedia = sanitizeMedia(media);
        if (sanitizedMedia) {
          finalList.push(sanitizedMedia);
        }
      }
      return finalList;
    }, [] as SanitizedMedia[]) ?? [];

  return {
    __tag: "SanitizedMediaContent",
    type: mediaContent.type,
    name: mediaContent.name ?? undefined,
    showCaptions: mediaContent.type !== "grid",
    mediaList,
  };
};
