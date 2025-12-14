import type { Media } from "@payload-types";

export const sanitizeMedia = (media: Media) => {
  if (!media.url) return;

  return {
    ...media,
    url: media.url,
  };
};
