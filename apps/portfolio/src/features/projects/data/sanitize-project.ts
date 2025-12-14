import type { Project } from "@payload-types";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { ConvertLexicalToHTMLArgs } from "node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToHtml/sync";
import { sanitizeMedia } from "@/features/media/data/sanitize-media";
import type { SanitizedMedia } from "@/features/media/media.types";
import type { SanitizedProject } from "../projects.types";

export const sanitizeProject = (project: Project): SanitizedProject => {
  return {
    __tag: "SanitizedProject",
    ...project,
    labels: project.labels?.map((label) => ({
      name: label.labelName,
      value: label.labelValue,
    })),
    description: convertLexicalToHTML({
      data: project.description as unknown as ConvertLexicalToHTMLArgs["data"],
    }),
    mainImage:
      typeof project.mainImage !== "number"
        ? sanitizeMedia(project.mainImage)
        : undefined,
    medium: project.medium?.map((medium) => {
      const mediaList =
        medium.mediaList?.reduce((finalList, media) => {
          if (typeof media !== "number") {
            const sanitizedMedia = sanitizeMedia(media);
            if (sanitizedMedia) {
              finalList.push(sanitizedMedia);
            }
          }
          return finalList;
        }, [] as SanitizedMedia[]) ?? [];

      return {
        type: medium.type,
        mediaList,
      };
    }),
  };
};
