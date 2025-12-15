import type { Media } from "@payload-types";
import { env } from "@/env";

export const sanitizeMedia = (media: Media) => {
  if (!media.url) throw new Error("Media has no url");

  return {
    ...media,
    url: `${env.VITE_PAYLOAD_URL}/${media.url}`,
  };
};
