import type { SanitizedMedia } from "../media/media.types";

export type SanitizedProject = {
  id: number;
  name: string;
  description: string;
  labels?: Array<{ name: string; value: string }>;
  mainImage?: SanitizedMedia;
};
